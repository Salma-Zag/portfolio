---
toc: True
layout: post
data: setup
title: Tools and Equipment Setup - Individual Guide
description: My journey through setting up tools and equipment.
categories: ['DevOps']
author: Adya Shipekar
permalink: /tools/blog
breadcrumb: True 
---

## Overview

In Sprint 1, we learned how to set up the basic tools and equipment and implement basic functions of VSCode to run our repositories. Here's a brief explanation of how I set up my computer to successfully run the tools necessary in CSSE:

**_NOTE: This setup is for WINDOWS computers only. If you are running your tools on a Mac or KASM server, the process may differ._**

---


### Step 1: Create Accounts


1. **Slack** – Sign up at [slack.com](https://slack.com) using a personal email. The CSSE workspace link can be found on the Open Coding Society pages.
2. **GitHub** – Create an account at [github.com](https://github.com). Choose a strong username and password (and be sure to remember these!)
3. **OpenCS** – Register on the OpenCS platform so that you can be signed in/out of class.


---


### Step 2: Install VS Code


Download and install **Visual Studio Code** from [code.visualstudio.com](https://code.visualstudio.com/).


---


### Step 3: Fork the Repository


1. Go to your GitHub account.
2. Go to Open-Coding-Society student repository and click **Fork** to fork the student repo.
3. This fork will serve as your personal workspace.


---


### Step 4: Set Up WSL


1. Open **PowerShell** as Administrator.
2. Run:
```powershell
wsl --install -d Ubuntu-24.04
wsl --set-default Ubuntu-24.04
```
3. Restart your system.
4. Open WSL (Ubuntu by default).
5. First-time Ubuntu setup:
```bash
mkdir opencs
cd opencs
git config --global credential.helper "/mnt/c/Program\ Files/Git/mingw64/bin/git-credential-manager.exe"
git clone https://github.com/Open-Coding-Society/student.git
cd student/
./scripts/activate_ubuntu.sh # prompts for your recently created WSL Ubuntu password
./scripts/activate.sh # prompts for Git UID and Personal Email
./scripts/venv.sh
```


---


### Step 5: Clone Repo in WSL


Inside your WSL Ubuntu terminal:


```bash
cd ~
git clone https://github.com/<your-username>/<your-forked-repo>.git
cd <your-forked-repo>
```


---

### Step 6: Verification


In your WSL Ubuntu terminal:
```bash
git --version # check that your GitHub has been successfully installed
python --version
pip --version
ruby -v
bundle -v
gem --version
git config --global --list
```


---


### Step 7: Open VSCode from WSL


In your WSL Ubuntu terminal, in your forked repository:


```bash
source venv/bin/activate
bundle install
code .
```


This will launch VS Code connected to your WSL environment. In the bottom left corner of VSCode you should see a blue rectangle that says 'WSL:Ubuntu-24.04'


---


### Step 8: Saving Changes

Before you commit changes, make sure your GitHub is running under your own account. In VSCode terminal:

```bash
git config --global user.name "<github username>"
git config --global user.email <github email>
```

Many projects include a **Makefile**. To build or run tasks:


```bash
make
```



---


✅ Congratulations! You should now have Slack, GitHub, OpenCS, VS Code, and WSL all set up. You’ve forked and cloned your project, and successfully saved changes inside WSL. 🚀