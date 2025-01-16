from locust import HttpUser, between, task

class MyUser(HttpUser):
    wait_time = between(1, 3)
    host = "http://34.172.213.41"

    def on_start(self):
        # Perform login when the user starts
        self.login()

    def login(self):
        # Customize this method based on your website's login process
        response = self.client.post(
            "http://vid-city.com/api/user/login",  # Update with your login endpoint
            data={
                "email": "munazza@gmail.com",
                "password": "123"
            }
        )
        # Check if login was successful, you may need to customize this check
        if response.status_code == 200:
            print("Login successful")
        else:
            print("Login failed")


    @task
    def fetch_user_videos(self):
        # Simulate fetching videos for a user
        response = self.client.get("http://vid-city.com/api/video/user/67715c19ae338c87e47ba0ee")
        print(f"Fetch user videos status: {response.status_code}")

    @task
    def fetch_all_videos(self):
        # Simulate fetching all videos
        response = self.client.get("http://vid-city.com/api/video/")
        print(f"Fetch all videos status: {response.status_code}")

    @task
    def register_user(self):
        # Simulate a new user registration
        response = self.client.post(
            "http://vid-city.com/api/user/register",
            data={
                "email": "new_user@example.com",
                "password": "password123",
                "username": "new_user"
            }
        )
        print(f"Register user status: {response.status_code}")

    @task
    def check_user_storage(self):
        # Simulate checking user storage
        response = self.client.get("http://vid-city.com/api/storage/user/67715c19ae338c87e47ba0ee")
        print(f"Check storage status: {response.status_code}")

    @task
    def check_usage_logs(self):
        # Simulate checking usage logs
        response = self.client.get("http://vid-city.com/api/usage/user/67715c19ae338c87e47ba0ee")
        print(f"Check usage logs status: {response.status_code}")
