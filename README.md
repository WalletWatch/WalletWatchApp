# WalletWatch
<div align="center">
    <img src="assets/img_ws-back.png" width="200"/>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/npm">
    <img src="https://img.shields.io/npm/v/npm.svg?style=flat-square" alt="npm"/>
  </a>
  </a>
  <a href="https://github.com/Louis3797/awesome-readme-template/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="license" />
  </a>
  <a href="https://codecov.io/github/WalletWatch/wallet_watch_app" > 
    <img src="https://codecov.io/github/WalletWatch/wallet_watch_app/graph/badge.svg?token=3PIMTJIDJ3"/> 
  </a>
</p>
<h4 align="center">
    <a href="http://www.gryumova.ru">View Demo</a>
</h4>


<b>WalletWatch</b> is a simple web application developed to monitor cryptocurrency wallet balances in [ERC20](https://etherscan.io), [BEP20 (Binance Smart Chain)](https://bscscan.com) networks via Web3.

## Functionality

<div align="center">
    <img src="/assets/wallet-4.gif" width="600">
</div>

- **Streamlined Wallet Tracking:** Input your ERC20 and BEP20 wallet addresses for seamless monitoring of multiple wallets in one place.
- **Token Selection:** Choose specific tokens to track, providing granular control over your crypto portfolio.
- **Balance Display:** Display of balances in table form. This provides a clear and easily understandable view of the state of your cryptocurrency assets.

## Requirements

- Python 3.6 and above
- Node.js
- Postgresql
- Redis
- Redux Toolkit

## Installation

1. Clone the repository and activate python virtual venv:

```bash
git clone https://github.com/WalletWatch/wallet_watch_app.git
cd wallet_watch_app

python3 -m venv env
source env/bin/activate
```

2. Run Python Django server with Redis and Celery:

```bash
make run-server
```

3. Start the React app:

```bash
make run-client
```

4. Go to [http://localhost:8000](http://localhost:8000/) in your web browser. (Check the port that your React application is running on)

## Usage

1. Add a new wallet.
2. After adding a wallet, you can add a token to view the balance. The data will be updated at a given frequency. You can change it in the project/celery.py file

```python
app.conf.beat_schedule = {
    "realtime_task_schedule": {
        "task": "realtime_task",
        "schedule": crontab(minute='*/15'), # every 15 minutes
    }
}
```

## Deploy the app

1. **Docker Setup:**<br/>
  Install Docker and Docker Compose on your server.
2. **Configuration:**<br/>
  Configure settings as per your environment.
3. **Domain Setup:**<br/>
  Configure your domain and A records to point to your server's IP address and open port 443 for external connection.
4. **Launch Docker Containers:**<br/>
  Launch the docker containers using the following commands:

```bash
docker-compose -p prod -f docker-compose.prod.yml down
docker-compose -p prod -f docker-compose.prod.yml up -d
```


## Contributing to the project

If you have suggestions for improving the project or have found an error, please open an issue or submit a pull request.

## License

Distributed under the MIT License. See LICENSE.txt for more information.
