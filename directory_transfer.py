import paramiko
import os
from pathlib import Path

def transfer_files(hostname, username, password, remote_path, port=22):
    try:
        # Initialize SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        # Connect to remote server
        ssh.connect(hostname, port, username, password)
        sftp = ssh.open_sftp()
        
        # Get current directory files
        current_dir = Path.cwd()
        files = [f for f in current_dir.iterdir() if f.is_file()]
        
        # Transfer each file
        for file in files:
            print(f"Transferring {file.name}...")
            remote_file_path = f"{remote_path}/{file.name}"
            sftp.put(str(file), remote_file_path)
            
        print("File transfer completed successfully!")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        
    finally:
        # Close connections
        sftp.close()
        ssh.close()

if __name__ == "__main__":
    # Configure these variables with your server details
    hostname = "your_server_ip"
    username = "your_username"
    password = "your_password"
    remote_path = "/path/to/remote/directory"
    
    transfer_files(hostname, username, password, remote_path)