---
title: Generate a Policy from Observations
description: Turn observed agent activity into a reviewed and enforceable Tenure policy.
---

Tenure converts observed agent activity into a draft policy. Review every capability and required evidence check before publishing the draft to runtime enforcement.

## Generate a draft

1. Open **Agents**.
2. Select the agent you want to govern.
3. Choose **Generate policy**.
4. Select the observation period.
5. Create the draft.

If Tenure cannot generate a draft, run the agent through at least one complete workflow and try again. The selected period must contain usable observed activity.

## Review policy details

Give the policy a stable ID, name, and description that identify the agent and its purpose.

Also review the project scopes and Tenure capabilities. These control the data and Tenure features available to tokens attached to the policy.

## Review allowed AI capabilities

The **Allowed AI capabilities** section shows tools observed for the agent.

Tools the agent invoked are selected by default. Tools that were available but unused remain unselected.

Evaluate each observed tool against the agent's required authority:

- Remove capabilities unused in valid workflows to eliminate unnecessary surface area.
- Verify that allowed tools match the agent's explicit token identity.
- Retain only the capabilities required for production execution.

Tools excluded from the policy are stripped before inference so the model never sees them. If the provider returns an unapproved tool anyway, Tenure blocks the action before execution.

## Review workflow preconditions

Use preconditions to require established evidence from prior tool results. Dependent actions remain blocked until all prerequisite checks pass.

For each suggested downstream action:

1. Select **Configure**.
2. Review the suggested prerequisite tools.
3. Keep only the prerequisites that should always be required.
4. Review any suggested result checks.
5. Apply the configuration.

A sequence-only prerequisite requires an earlier tool result to exist. A field condition adds a check against that returned result.

For example, you might require `fetch_customer` before `generate_email`, then require the returned `customer_id` to match the `customer_id` passed to `generate_email`.

Proposed preconditions reflect actual observed sequence traffic. Review the draft to ensure every required check represents an intentional prerequisite in your workflow.

## Choose who handles prerequisite errors

The workflow preconditions section includes a policy-wide setting:

**Fail workflow when a prerequisite returns an error**

When enabled, Tenure blocks governed downstream calls after a required earlier tool returns an error.

When disabled, Tenure does not block solely because the result was an error. The agent framework remains responsible for retrying, recovering, stopping, or continuing.

A missing prerequisite result still blocks the downstream action in either mode.

## Save and publish

Use **Save draft** if you want to continue reviewing later.

Use **Publish policy** when the draft is ready. Publishing:

- Creates the policy
- Attaches it to the observed agent token
- Makes the reviewed controls active for subsequent requests

Publishing locks the current policy version for enforcement. Subsequent policy edits increment the version number, preserving complete audit history for inspection.

## Validate the policy

After publishing, run both allowed and intentionally disallowed scenarios.

Confirm that:

- Required tools remain visible to the model
- Unnecessary tools are removed
- Valid workflows continue
- Missing prerequisites block dependent actions
- Error handling follows the selected policy setting
- Enforcement decisions appear in Audit

## Next steps

- [Control Which Tools an Agent Can Use](/docs/runtime-enforcement/control-agent-tools/)
- [Require Evidence Before an Action](/docs/runtime-enforcement/workflow-preconditions/)
