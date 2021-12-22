<h1 align="center">
NZCSA Frontend
</h1>
<p align="center">
React/Redux, MUI
</p>


> New Zealand Chinese Students' Association

The New Zealand Chinese Students’ Association (NZCSA) is an incorporated student society that aims to serve the Chinese students in New Zealand, promoting the Chinese Culture and act as a bridge between the Chinese student community and the local mainstream community

## Clone or download

```terminal
$ git clone https://github.com/UoaWDCC/NZCSA-Frontend.git
```


# Usage (run fullstack app on your machine)

## Prerequirements

- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)
- [MUI](https://mui.com/)

Notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side(Frontend) usage(PORT: 3000)

```terminal
$ cd NZCSA-Frontend   // go to client folder
$ yarn i       // npm install pacakges
$ yarn start // run it locally

// deployment for client app
$ yarn run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ yarn run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side(Backend) usage(PORT: 5000)
### [NZCSA-Backend](https://github.com/UoaWDCC/NZCSA-Backend)


# Dependencies

| Client-side                   | 
| ----------------------------- |
| axios: ^0.15.3                | 
| babel-preset-stage-1: ^6.1.18 | 
| lodash: ^3.10.1               | 
| react: ^16.2.0                |
| react-dom: ^16.2.0            | 
| react-redux: ^4.0.0           | 
| react-router-dom: ^4.2.2      | 
| redux: ^3.7.2                 
| redux-thunk: ^2.1.0           
| axios: ^0.21.1    
| swiper: ^6.8.4    


# Contributor

| Name     |
| ---      |
| Melo Guan |
| Kirsty Gong     |
| Zhiqing Guo     |
| Tony Cui     |
| Alex Liang     |
| Linkun Gao     |
| Garfield Wang     |

