# WalletWatch
<div align="center">
    <img src="assets/img_ws-back.png" width="300"/>
</div>

<p align="center">
  <a href="https://www.npmjs.com/package/npm">
    <img src="https://img.shields.io/npm/v/npm.svg?style=flat-square" alt="npm"/>
  </a>
  </a>
  <a href="https://github.com/Louis3797/awesome-readme-template/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="license" />
  </a>
</p>
<h4 align="center">
    <a href="http://www.gryumova.ru">View Demo</a>
</h4>


WalletWatch is a simple web application developed to monitor cryptocurrency wallet balances in [ERC20](https://etherscan.io), [BEP20 (Binance Smart Chain)](https://bscscan.com) networks via Web3.

## Functionality

<div align="center">
    <img src="assets/wallet.gif" width=600 style="border-radius: 5px; -webkit-box-shadow: 0px 0px 47px 8px rgba(0,0,0,0.66); -moz-box-shadow: 0px 0px 47px 8px rgba(0,0,0,0.66);box-shadow: 0px 0px 47px 8px rgba(0,0,0,0.66);"/>
</div>

- Ability to input ERC20, BEP20 wallet addresses. This simplifies the process of tracking balances on various wallets.
- Ability to select tokens to track balance. Users can select tokens they want to track, giving more control over their cryptocurrency assets.
- Display of balances in table form. This provides a clear and easily understandable view of the state of your cryptocurrency assets.

## Requirements

<div align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original-wordmark.svg" title="Python" alt="Python" width="80" height="80"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="Node.js" alt="Node.js" width="80" height="80"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" title="Postgresql" alt="Postgresql" width="80" height="80"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redis/redis-original-wordmark.svg" title="Redis" alt="Redis" width="80" height="80"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redis" alt="Redis" width="80" height="80"/>&nbsp;
</div>

- Python 3.6 and above
- Node.js
- Postgresql
- Redis
- Redux Toolkit

## Installation

1. Clone the repository and activate python virtual venv:

```bash
git clone https://github.com/WalletWatch/WalletWatchApp.git
cd WalletWatchApp

python3 -m venv env
source env/bin/activate
```

2. Install Python dependencies:

```bash
make prepare-python
```

3. Install Node.js dependencies:

```bash
make prepare-npm
```

4. Start the application:

To start the server, use:
```bash
make run
```

To start the client application:
```bash
make run-client
```

5. Go to [http://localhost:8000](http://localhost:8000/) in your web browser. (Check the port that your React application is running on)

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

## Contributing to the project

If you have suggestions for improving the project or have found an error, please open an issue or submit a pull request.

## License

Distributed under the MIT License. See LICENSE.txt for more information.
