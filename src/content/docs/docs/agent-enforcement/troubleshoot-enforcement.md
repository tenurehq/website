---
title: Troubleshoot Enforcement Decisions
description: Diagnose missing tools, blocked actions, and workflow precondition failures.
---

When Tenure withholds a tool call, start with the active agent token and policy, then use Audit to identify the enforcement decision.

## Confirm the request identity

Check that the request:

- Uses the intended agent token
- Is routed through the Tenure base URL
- Uses a token that has not expired or been revoked
- Is attached to the expected agent policy
- Has access to the requested project scope

Tenure resolves the latest active version of the policy attached to the token. If the behavior changed after a policy update, confirm which version appears in Audit.

## A tool is missing before the model call

**Likely cause:** the tool is outside the active policy allowlist.

Check:

1. Open **Policies** and select the agent policy.
2. Confirm the tool appears under allowed AI capabilities.
3. Confirm the tool name and type match the application request.
4. Confirm the agent token is attached to that policy.

Tenure removes disallowed tools before sending the request to the provider and records the filtering decision in Audit.

## A forced tool selection returns 403

**Likely cause:** the request explicitly selected a tool that is not allowed.

Review the request's tool selection and the policy allowlist. Tenure rejects a disallowed forced selection before the provider is called.

## The provider returned a tool call, but it is missing from the response

**Likely cause:** the returned call failed the allowlist or a workflow precondition.

Open **Audit** and filter to the time of the request. Look for a denied authorization event associated with the agent token and policy version.

If the response contained multiple calls, Tenure may release the allowed calls while withholding only the denied ones.

## Preconditions were not satisfied

Check the prerequisite in the policy draft or active policy.

Common causes include:

- The prerequisite tool was not called
- Its result was not returned
- The result used a different call ID
- The dependent action belongs to a different workflow
- A configured result value did not match
- A returned value did not match the downstream action argument
- The prerequisite returned an error and the policy is configured to fail on prerequisite errors

Run the workflow from the beginning and confirm that each tool result is returned before the dependent action is requested.

## A valid result still fails a check

Review the result and the configured field condition.

Check that:

- The expected field exists
- Its value and type are correct
- The selected condition reflects a real business requirement
- The downstream argument uses the expected field and value

Generated checks are suggestions based on observed activity. Remove a condition if it captured an incidental value rather than a rule the workflow should enforce.

## Error handling is unexpected

Review **Fail workflow when a prerequisite returns an error** on the active policy.

- **Enabled:** Tenure blocks governed downstream actions after a prerequisite error.
- **Disabled:** the agent framework owns retry, recovery, stopping, or continuation.

A missing result blocks the dependent action regardless of this setting.

## Streaming request returns an error event

Streaming endpoints return enforcement decisions using the provider-compatible stream format. A stream can begin successfully and later report a denial when Tenure evaluates a completed tool call.

Check the final stream events and the corresponding Audit entry. Do not rely only on the initial HTTP status for a streaming request.

## No observations appear

Confirm that:

- The token is an agent token
- The request reached Tenure
- The provider call completed
- Tool calls include call IDs
- The application returned results with matching call IDs
- The tool format is supported

Observation writes may appear shortly after the client response. Refresh the agent page before concluding that the request was not recorded.

## Use Audit

Audit events are associated with the actor, request, policy, outcome, and event details. Use the event time and agent token to find the request, then confirm:

- Policy ID and version
- Provider and model
- Tool name
- Whether the tool was filtered, forced, or returned by the model
- Whether a workflow precondition caused the denial

Audit results are shown newest first and can be narrowed by date and event category.

## If the issue remains

Capture:

- The request time
- Agent token name
- Policy ID and version
- Provider endpoint
- Tool name and call ID
- The public error response
- The matching Audit entry

Do not include bearer tokens, provider credentials, or sensitive tool arguments in a support request.
