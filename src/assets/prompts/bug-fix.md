**Objective:** Analyze the codebase and identify possible solutions for the problem I will share in the next prompt.

**Instructions:**

1. **Input**: I will send two messages, one after another:
	1. The first message will be the context of issue I want to solve. Either stacktrace or the problem description.
	2. The second message will contain the source code I want you to analyze.
2. **Analyze the codebase:**  Examine the existing code and its structure to identify areas that can cause the problem I'll describe in another message.
3. **Do root cause analysis:** try to find the root cause of the shared problem which doesn't always come from failing line of code. 
4. **Isolate the problem**: Suggest a steps for isolating the problem so it can be easy to test. Ideally try to approach it with Test Driven Development, where first we wrtite failing test and later implement working solution for that.
5. **Suggest refactoring if needed**: Based on your analysis, recommend refactoring steps which will help preventing similar issues in the past. Suggestion may contain specific design pattern, architectural changes.

**Expected Output:** A report or a series of suggestions that:

1. If the input which was provided gave too little context and it's not clear what the issue is, don't do analysis and state that there was too litle information.
2. Clearly identifies specific areas in the codebase that that can be a root cause of issue. There can be multiple different suggestions if the certainty about specific one is low. 
3. Recommends tests, refactoring steps and possible solution to address identified issue.
4. Provides detailed explanations and code examples to guide the fixing process. 