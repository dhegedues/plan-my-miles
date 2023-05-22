<h1>PlanMyMiles</h1>
<!-- TABLE OF CONTENTS -->
<details>
  <summary><b>Table of Contents</b></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#usage">Usage</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li>
      <a href="#getting-started">Developing locally</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#installation">Firebase Emulation and starting the app</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

PlanMyMiles is a web app that distributes your vehicle lease or insurance mileage budget dynamically and lets you know if you have to change anything about your driving habits so that you can avoid costly overdraft.
<br />

### Built with:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/static/v1?style=for-the-badge&message=Vitest&color=6E9F18&logo=Vitest&logoColor=FFFFFF&label=)

<br />

:globe_with_meridians: **View the live demo over at [planmymiles.web.app](https://planmymiles.web.app/)**

<br />
<!-- USAGE EXAMPLES -->

### Usage

At the current state of development, new users are initialized with some sample data (in future releases, users will be onboarded interactively). Head over to `Settings` to set up your vehicle and then return to the `Dashboard` to enter your current mileage.

<br />
<!-- ROADMAP -->

## Roadmap

- :white_check_mark: Base app with settings, widgets and chart
- [ ] Trips
  - Mileage that you use on trips will be subtracted from your everyday mileage
  - Chart will show how planned trips affect your mileage projection and whether you can afford them with your remaining mileage
- [ ] Progressive Web App functionality
- [ ] Overdraft limit and costs
- [ ] Multiple vehicles

See the [open issues](https://github.com/dhegedues/plan-my-miles/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br />
<!-- GETTING STARTED -->

## Developing locally

If you want to try PlanMyMiles locally, these are the steps you have to follow.

### Prerequisites

- Install Node.js and npm

### Installation

1. Clone the project repository
   ```sh
   git clone https://github.com/dhegedues/plan-my-miles.git
   ```
2. Install Firebase
   ```sh
   npm install firebase
   ```

### Firebase Emulation and starting the app

1. Initialize Firebase

   ```sh
   firebase init
   ```

   1. When asked which Firebase features you want to set up, select `Emulators`

   2. When asked which emulators you want to set up, select:

      - `Authentication Emulator`
      - `Firestore Emulator`
      - `Hosting Emulator`

   3. When asked which ports you want to use, select:

      - `auth: 9099`
      - `firestore: 8080`
      - `hosting: 5000`

      and confirm all other options to `enable the Emulator UI`, use any available port for it and to `download the emulators now`.

2. Start the emulators
   ```sh
   firebase emulators:start
   ```
3. Ready!
   You should now be able to access the app at
   ```
   http://localhost:5000
   ```
   Hit `Try it out` to create a guest user account or sign up on the login page!
4. Visit the emulator suite at
   ```
   http://localhost:4000
   ```
   to see the users that you created (Tab `Authentication`) and their data in the Firestore (Tab `Firestore`).
   <br />
   <br />
   <p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<br />
<!-- CONTACT -->

## Contact

Feel free to email me at <david@hegedues.org> if you have any questions or suggestions!

<p align="right">(<a href="#readme-top">back to top</a>)</p>
