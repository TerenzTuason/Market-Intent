#!/usr/bin/env python
import sys
import warnings
from datetime import datetime

from scrape.crew import Scrape

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

def run():
    """
    Run the crew to scrape company profile data.
    """
    inputs = {
        'topic': 'Optum',
        'company_url': 'https://www.optum.com',
        'linkedin_url': 'https://www.linkedin.com/company/optum/',
        'rocketreach_url': 'https://rocketreach.co/optum-profile_b5f12b5cf42d354a'
    }
    
    try:
        Scrape().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")
