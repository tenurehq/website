---
title: Require Evidence Before an Action
description: Use workflow preconditions to require an earlier tool result before a dependent action is released.
---

Capability policies define what an agent may do; preconditions define what must be true first. Tenure verifies required evidence from prior steps before allowing downstream execution.

## A simple precondition

Consider an agent that generates an email for a customer:

```text
fetch_customer
      ↓
result received
      ↓
generate_email
```

Allowlists establish authority; preconditions establish readiness.

While capability policy decides if generate_email is permitted, preconditions verify that fetch_customer returned valid evidence first.

If the required `fetch_customer` result is missing, Tenure withholds `generate_email`.

## Configure a prerequisite

In an observation-generated policy draft:

1. Enable **Workflow preconditions**.
2. Find the downstream action.
3. Select **Configure**.
4. Choose the earlier tools that must return results.
5. Review any result checks.
6. Apply the configuration.

All selected prerequisites are required. Keep only relationships that should hold for every valid use of the downstream action.

## Sequence-only prerequisites

A sequence-only prerequisite checks that the earlier tool returned a result.

Use this when completion matters but the result contents do not need additional validation.

Example:

```text
review_email must return a result before send_email
```

## Result checks

A prerequisite can also check a value in the earlier result.

For example:

```text
fetch_customer result: opted_in = true
```

This can prevent a later action when the required evidence is missing or has an unexpected value.

Tenure can also compare a returned value with an argument of the downstream action. This is useful for keeping identity consistent across steps:

```text
fetch_customer result customer_id
must equal
generate_email argument customer_id
```

Review suggested checks carefully. A value that appeared consistently during observation is not automatically a permanent business rule.

## Missing results

A tool invocation alone does not satisfy a result precondition. The application must return the result using the original tool call ID.

A result may appear missing when:

- The prerequisite tool was never called
- The tool result was not returned
- The result used the wrong call ID
- The result belongs to a different workflow
- The request did not pass through Tenure

## Prerequisite errors

The policy-wide **Fail workflow when a prerequisite returns an error** setting controls who owns error handling.

When enabled, Tenure blocks governed downstream calls after a required prerequisite returns an error.

When disabled, Tenure allows the agent framework to decide whether to retry, recover, stop, or continue.

This setting does not create an error branch, and Tenure does not infer one from observed behavior. A missing result still fails the precondition.

## Multiple returned actions

Tenure evaluates returned tool calls independently on a per-action basis. Verified actions are released to your runtime, while actions lacking required evidence are blocked and withheld.

## Recommended review

Before publishing, test:

- A complete valid workflow
- A dependent action with no prerequisite result
- A result that fails a configured check
- A prerequisite tool error
- Multiple returned tool calls with mixed outcomes

Then use Audit to confirm which policy and precondition produced each decision.

## Related pages

- [Generate a Policy from Observations](/docs/agent-governance/generate-a-policy/)
- [Troubleshoot Enforcement Decisions](/docs/runtime-enforcement/troubleshoot-enforcement/)
