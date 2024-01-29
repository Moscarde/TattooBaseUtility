from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

def initialize_driver():
        options = Options()
        options.headless = True
        return webdriver.Chrome(
            service=Service(ChromeDriverManager().install()), options=options
        )


if __name__ == "__main__":
    driver = initialize_driver()
    driver.get("https://www.google.com/")
    input('')
