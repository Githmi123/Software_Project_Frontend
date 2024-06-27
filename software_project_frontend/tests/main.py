import time
from selenium.webdriver.support import expected_conditions as EC
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


options = Options()
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)

driver.get("http://localhost:3000/")
#driver.get("http://35.198.221.3:3000/")

driver.maximize_window()

wait_time=5

# login with email and password
user_name_box_id = "userName"
password_box_id = "standard-adornment-password"
user_name_box = driver.find_element(By.ID, user_name_box_id)
password_box = driver.find_element(By.ID, password_box_id)

user_name_box.send_keys("b@gmail.com")
password_box.send_keys("bbbbb22222")

submit_button = driver.find_element(By.ID, "login-submit")
submit_button.click()

# Create New Assignment
new_assignment_button = WebDriverWait(driver, wait_time).until(
    EC.element_to_be_clickable((By.XPATH, "//*[text()='New Assignment']"))
)
new_assignment_button.click()


try:
    dropdown = WebDriverWait(driver, wait_time).until(
        EC.element_to_be_clickable((By.ID, "select-Module"))
    )
    dropdown.click()
except Exception as e:
    print("Error locating or clicking dropdown:", e)

try:
    option_to_select = WebDriverWait(driver, wait_time).until(
        EC.element_to_be_clickable((By.XPATH, "//li[text()='EE3212']"))
    )
    option_to_select.click()
except Exception as e:
    print("Error locating or clicking dropdown option:", e)


try:
    dropdown = WebDriverWait(driver, wait_time).until(
        EC.element_to_be_clickable((By.ID, "select-Batch"))
    )
    dropdown.click()
except Exception as e:
    print("Error locating or clicking dropdown:", e)


try:
    option_to_select = WebDriverWait(driver, wait_time).until(
        EC.element_to_be_clickable((By.XPATH, "//li[text()='22']"))
    )
    option_to_select.click()
except Exception as e:
    print("Error locating or clicking dropdown option:", e)

assignment_name_box = driver.find_element(By.ID, 'outlined-basic')

assignment_name_box.send_keys("InClass Test 1")

file_path = "C:/Users/Nuran/Desktop/res/marking_scheme.xlsx"

file_input = WebDriverWait(driver, wait_time).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='file']"))
)
file_input.send_keys(file_path)

next_button = WebDriverWait(driver, wait_time).until(
    EC.element_to_be_clickable((By.XPATH, "//*[text()='Next']"))
)
next_button.click()


# quit browser after 10 secs
time.sleep(10)
driver.quit()