from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# Khởi tạo WebDriver
driver = webdriver.Edge()
driver.maximize_window()

# Đường dẫn tới các file HTML
sign_up_url = "https://img-background-removal.vercel.app/views/sign-up.html"
sign_in_url = "https://img-background-removal.vercel.app/views/sign-in.html"

def test_sign_up(email, password, name, accept_terms):
    try:
        driver.get(sign_up_url)

        # Điền thông tin đăng ký
        email_input = driver.find_element(By.ID, "email-sign-up")
        password_input = driver.find_element(By.ID, "password-sign-up")
        name_input = driver.find_element(By.ID, "name-sign-up")
        terms_checkbox = driver.find_element(By.ID, "remember-me")
        sign_up_button = driver.find_element(By.ID, "sign-up-button")

        email_input.clear()
        email_input.send_keys(email)
        password_input.clear()
        password_input.send_keys(password)
        name_input.clear()
        name_input.send_keys(name)

        if accept_terms:
            if not terms_checkbox.is_selected():
                terms_checkbox.click()
        else:
            if terms_checkbox.is_selected():
                terms_checkbox.click()

        sign_up_button.click()

        # Chờ cảnh báo hoặc điều hướng
        WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        print(f"Sign-up alert: {alert.text}")
        alert.accept()
    except TimeoutException:
        print("Sign-up test: No alert received or timeout.")
    except Exception as e:
        print(f"Sign-up test failed: {e}")

def test_sign_in(email, password):
    try:
        driver.get(sign_in_url)

        # Điền thông tin đăng nhập
        email_input = driver.find_element(By.ID, "email-sign-in")
        password_input = driver.find_element(By.ID, "password-sign-in")
        sign_in_button = driver.find_element(By.ID, "sign-in-button")

        email_input.clear()
        email_input.send_keys(email)
        password_input.clear()
        password_input.send_keys(password)
        sign_in_button.click()

        # Chờ cảnh báo hoặc điều hướng
        WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        print(f"Sign-in alert: {alert.text}")
        alert.accept()
    except TimeoutException:
        print("Sign-in test: No alert received or timeout.")
    except Exception as e:
        print(f"Sign-in test failed: {e}")

def run_tests():
    # Test các trường hợp cho Sign-up
    sign_up_cases = [
        ("valid@example.com", "password123", "Valid User", True),
        ("", "password123", "No Email", True),
        ("invalid-email", "password123", "Invalid Email", True),
        ("duplicate@example.com", "password123", "Duplicate Email", True),
        ("valid@example.com", "short", "Weak Password", True),
        ("valid@example.com", "password123", "Valid User No Terms", False)
    ]

    for case in sign_up_cases:
        print(f"Running sign-up case: {case}")
        test_sign_up(*case)

    # Test các trường hợp cho Sign-in
    sign_in_cases = [
        ("valid@example.com", "password123"),
        ("", "password123"),
        ("valid@example.com", "wrongpassword"),
        ("nonexistent@example.com", "password123")
    ]

    for case in sign_in_cases:
        print(f"Running sign-in case: {case}")
        test_sign_in(*case)

run_tests()
driver.quit()