---
title: Connect an Agent
description: Put Tenure on the model request path to observe agent behavior and generate active runtime policy.
---

Tenure sits directly on the model request path. Your application keeps its existing OpenAI or Anthropic API format, but routes requests through Tenure using an authenticated agent token.

## 1. Create an agent policy

Open **Policies** in the Tenure UI and select **Create policy**.

Choose **Agent policy** to create the starter policy used during observation.

Configure:

- A stable policy ID and descriptive name
- The projects the agent may access
- Whether the agent may receive user persona context
- The Tenure capabilities the agent needs

Keep the **Chat** capability enabled. It authorizes requests to the supported OpenAI Chat Completions, OpenAI Responses, and Anthropic Messages endpoints.

Extraction and injection are optional. They control whether the agent may learn from conversations or receive Tenure memory.

This starter policy acts as a baseline. Once Tenure records representative tool calls, you can generate, review, and publish a policy that automatically enforces allowed capabilities for that token.

Save the policy when you are finished.

## 2. Generate an agent token

Open **Settings**, generate an **Agent token**, and attach the policy you created.

Copy the token immediately. Tenure does not display the full value again after you close the dialog.

Agent tokens begin with:

```text
agt_
```

Use a separate token for each agent you want to observe and govern. This keeps its activity and active policy clearly attributed.

## 3. Point the agent at Tenure

Set the API base URL to your Tenure instance and use the agent token as the bearer token.

For a local installation:

```text
http://localhost:5757/v1
```

### OpenAI

Tenure supports OpenAI Chat Completions and OpenAI Responses. Keep your existing request format and change the base URL and API key in your client configuration.

```text
Base URL: http://localhost:5757/v1
API key: agt_your_agent_token
```

### Anthropic

For Anthropic Messages, point the client at your Tenure host and use the agent token for authentication.

```text
Base URL: http://localhost:5757
API key: agt_your_agent_token
```

Your application still executes tools. Tenure observes and governs the structured tool calls exchanged between the application and model provider.

## 4. Run a normal workflow

Exercise the agent as you normally would. For useful policy suggestions, include complete workflows where:

1. The model requests a tool.
2. Your application executes it.
3. Your application returns the result with the original tool call ID.
4. The model continues to the next step.

Use representative tasks and tool results. Tenure can only propose controls from activity that passes through it.

## 5. Confirm observation

Open **Agents** and select the agent token.

After the first completed requests, you should see:

- The providers and models used by the agent
- Tools made available to the model
- Tools the model invoked
- Recent observed activity

Observation tracks what the agent attempted; it does not grant authority. Use this concrete record to review tool activity before locking down an enforcement policy.

## Next steps

- [Observe Agent Workflows](/docs/agent-governance/observe-agent-workflows/)
- [Generate a Policy from Observations](/docs/agent-governance/generate-a-policy/)
