import os
from crewai import Agent, Task, Crew, Process

os.environ["OPENAI_API_BASE"] = "https://api.deepseek.com"
os.environ["MODEL_NAME"] = "deepseek-r1-distill-llama-70b"
os.environ["OPENAI_API_KEY"] = "sk-1c54d6c6601d4c69ae386537c9795630"

email = "nigerian prince sending some gold"
is_verbose = True

classifier = Agent(
    role="email classifier",
    goal="Accurately classify emails based on their importance, give every email one of these ratings: important, casual, or spam.",
    backstory="You are an AI assistant whose only job is to classify emails accurately and honestly. Do not be afraid to give emails bad rating if they are not important. Your job is to help the user manage their inbox.",
    verbose=is_verbose,
    allow_delegation=False
)

responder = Agent(
    role="email responder",
    goal="Based on the importance of the email, write a concise and simple response. If the email is rated 'important', write a formal response. If the email is rated 'casual', write a simple response, and if the email is rated 'spam', ignore the email. No matter what, be concise",
    backstory="You are an AI assistant whose only job is to write short responses to emails based on their importance. The importance will be provided to you by the 'classifier' agent.",
    verbose=is_verbose,
    allow_delegation=False
)

classify_email = Task(
    description=f"Classify the email: '{email}'",
    agent=classifier,
    expected_output="One of these three options: 'important', 'casual', or 'spam'."
)

respond_to_email = Task(
    description=f"Respond to the email: '{email}'",
    agent=responder,
    expected_output="A short response to the email."
)

crew = Crew(
    agents=[classifier, responder], 
    tasks=[classify_email, respond_to_email],
    verbose=True,
    process=Process.sequential
)

output = crew.kickoff()
print(output)
