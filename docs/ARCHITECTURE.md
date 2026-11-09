# AAROP browser-demo architecture

Customized and maintained by [Samar](https://github.com/samardonapati07-crypto). Source attribution is retained in [`NOTICE.md`](../NOTICE.md).

## Implemented components

| Component | File | Responsibility |
| --- | --- | --- |
| Demo interface | `app/page.tsx` | Scenarios, animated snapshots, agent cards, optional narration, and trace download. |
| Loop engine | `lib/aarop.ts` | A synchronous generator implementing explicit phases and budget checks. |
| Planner | `plan` in `lib/aarop.ts` | Rule-based selection of calculator or local lookup/synthesis tasks. |
| Tools | `safeCalc` / `callTool` | Restricted arithmetic, a built-in knowledge base, and text synthesis. |
| Verifier | `verify` | Checks the last result for errors or empty output and assigns a demo confidence. |
| Observability | `TraceEvent` / `LoopSnapshot` | In-memory events, phase history, task results, and JSON export. |
| Optional narration | `realComplete` | A browser-to-OpenAI request explaining the final result. |
| Theme | `components/ThemeToggle.tsx` | A system-aware preference stored in localStorage. |

The roles represent logical work within one browser loop. They are not independently hosted agents. Research queries use the built-in knowledge base rather than live web search. The mock model cost and verifier confidence are illustrative values.

## Execution sequence

```mermaid
sequenceDiagram
    participant UI as Browser UI
    participant Loop as Loop engine
    participant Tool as Local tool
    participant Critic as Verifier
    UI->>Loop: Objective and budgets
    Loop->>Loop: Perceive and plan
    loop Pending work within budget
        Loop->>Tool: Execute next task
        Tool-->>Loop: Result or error
        Loop->>Loop: Observe result
        alt Tool failure
            Loop->>Loop: Retry or escalate
        else Tool succeeded
            Loop->>Critic: Verify completed work
            Critic-->>Loop: Acceptance and confidence
        end
        Loop-->>UI: Snapshot and trace events
    end
    Loop-->>UI: Final result or escalation
```

The UI delays snapshots to animate the loop. Step, simulated cost, and elapsed-time budgets are checked during execution. Failure injection produces repeated tool errors to demonstrate circuit-breaker escalation. Run state is held in memory and does not survive a page refresh.

## Proposed production mapping

These services are design options, not installed infrastructure or implemented features in this repository.

| Concern | Browser demo | Possible production implementation |
| --- | --- | --- |
| Durable execution | In-memory generator | Temporal workflows and checkpoints. |
| Model routing | Deterministic mock; optional narration | Authenticated model gateway, real token accounting, and provider routing. |
| Retrieval | Small built-in knowledge base | pgvector or Qdrant with retrieval evaluation. |
| State | React state and loop snapshots | Postgres and a durable run store. |
| Tool execution | Local functions | Isolated workers, schema validation, permissions, and resource limits. |
| Tracing | In-memory event list and JSON export | OpenTelemetry with an external trace backend. |
| Serving | Next.js UI | Authenticated API and worker services. |
| Runtime | One browser tab | Container orchestration and application monitoring. |

## Design decisions

1. **Explicit phases:** keep transitions observable so the demo can explain each step.
2. **Bounded execution:** escalate on exhausted budgets instead of continuing indefinitely.
3. **Verification:** inspect completed results before reporting success.
4. **Repeatable default:** keep the mock path deterministic and usable without credentials.
5. **Browser-only narration:** optional credentials are sent directly to OpenAI and remain in the current tab's memory.

## Verification

Run `npm test`, `npm run typecheck`, `npm run test:e2e`, and `npm run build` from the repository root. The browser test suite starts its own development server.
