---
title: Control Which Tools an Agent Can Use
description: Use an agent policy allowlist to limit the tools visible and available to an agent.
---

An agent policy controls which tools an agent may use. Tenure applies the allowlist before the model runs and checks returned tool calls again before they reach your application.

## Why Tenure checks twice

Before the provider request, Tenure removes tools that are not allowed by the active policy. The model does not see those tools.

After the provider response, Tenure checks every returned tool call again. This prevents a disallowed structured action from reaching the agent framework even if it appears in the response.

## Configure the allowlist

For an observation-generated policy, review allowed tools in the policy draft.

- Invoked tools are selected by default.
- Available but unused tools remain unselected.
- You can add or remove observed tools before publishing.

Keep the allowlist limited to capabilities the agent needs for its role.

For example, a customer outreach agent might need:

```text
fetch_customer
generate_email
review_email
send_email
```

It may not need:

```text
delete_customer
export_database
```

The second group should remain outside the policy.

## Forced tool selection

Some provider requests explicitly select a tool instead of allowing the model to choose.

If the selected tool is not allowed, Tenure rejects the request before calling the provider. Update the request or review the active policy rather than adding a tool solely to bypass the denial.

## Multiple tool calls

A model response may contain more than one tool call.

Tenure evaluates each call independently. Allowed calls remain available to the agent framework, while denied calls are withheld. If every recognized tool call is denied, Tenure returns an enforcement error.

## Matching tools

Tool names and types must match the policy. Where a policy is limited to a specific provider, the provider must match as well.

Use stable tool names across deployments. Renaming a tool creates a different capability and requires the policy to be reviewed again.

## When a tool is blocked

Tenure records important enforcement decisions in Audit, including:

- Tools removed before the provider request
- Explicitly selected tools that were denied
- Returned tool calls that were withheld
- Workflow preconditions that were not satisfied

Audit records include the policy version used for the decision, helping you verify that the agent is attached to the expected policy.

## Related pages

- [Generate a Policy from Observations](/docs/agent-governance/generate-a-policy/)
- [Require Evidence Before an Action](/docs/runtime-enforcement/workflow-preconditions/)
- [Troubleshoot Enforcement Decisions](/docs/runtime-enforcement/troubleshoot-enforcement/)
