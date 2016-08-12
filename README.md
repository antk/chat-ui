app skeleton taken from [angular-seed](https://github.com/angular/angular-seed)


###Running locally

####Install homebrew

`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

####Install Git

`$ brew install git`

####Install NodeJs (also installs npm)

`$ brew install node`

####Clone or download zip of this repo

#####Clone

```$ git clone git@github.com:antk/chat-ui.git```

#####Download zip
* save to location of choice
* cd to saved location

####Install dependencies

```$ npm install```

####Start server

```$ npm start```

hit [http://localhost:8000/](http://localhost:8000/)

####Run unit tests

```$ npm test```

####Run e2e tests
on first run
```npm run update-webdriver```
to update WebDriver

then
```npm run protractor```