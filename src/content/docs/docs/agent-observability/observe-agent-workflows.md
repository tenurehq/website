---
title: Observe Agent Workflows
description: Review the tools and workflow activity Tenure observes from an agent.
---

Tenure captures agent activity directly on the model request path across supported OpenAI and Anthropic protocols. This establishes a concrete behavioral baseline before you publish active enforcement rules.

## Open an agent

Open **Agents** in the Tenure UI and select an agent token.

The agent view summarizes activity associated with that identity, including its active policy, providers, models, and recent observations.

If no activity appears, confirm that the application is using the expected agent token and that its requests are routed through Tenure.

## Available and invoked tools

Tenure separates two useful views of agent capability use.

### Available tools (Observed Exposure)

Capabilities supplied by your application that entered model context. This reveals the total authority your system made visible to the model.

### Invoked tools (Observed Use)

Tools invoked by the model during a run. Shows the specific capabilities used to accomplish the task.

## Workflow activity

When your application returns tool results using their original call IDs, Tenure can associate later actions with the earlier results that preceded them.

For example:

```text
fetch_customer
      ↓
generate_email
      ↓
review_email
      ↓
send_email
```

A complete workflow gives Tenure enough evidence to suggest that a later action may depend on an earlier result.

Tenure deterministically records step sequences and tool outputs on the wire. Observation records what happened; your reviewed policy decides what is allowed to happen.

## What to run during observation

Use representative workflows rather than a single ideal demonstration.

Include:

- Common successful tasks
- Different valid inputs
- Tools that are available but should rarely be used
- Retries and normal framework behavior
- Parallel tool calls if the agent uses them
- Streaming requests if the production agent streams

Policy drafts are generated strictly from activity captured during the selected window. Ensure observation covers full production tasks before drafting enforcement rules.

## Incomplete observations

A workflow may be incomplete when:

- The application does not return the tool result
- The result does not include the original call ID
- A stream is interrupted before the tool call completes
- The request bypasses Tenure
- The provider payload does not contain a supported tool call

Incomplete activity can still appear in recent observations, but it may not produce a usable workflow prerequisite.

## Observation and enforcement

Publishing a policy transforms discovery into active enforcement. Tenure continues logging every turn while filtering forbidden capabilities and verifying evidence at runtime.

Blocked tool calls are not treated as completed workflow steps. Review the audit trail when you need to understand why an action was withheld.

## Next steps

When the agent has completed representative workflows, [generate a policy from its observations](/docs/agent-governance/generate-a-policy/).
