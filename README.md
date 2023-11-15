# A React FM Synthesiser

This project combines the power of React in the frontend development along with PureData audio engine in order to create a simple FM synthesiser.

## Description

The synthesiser is a simple 2 operator FM synthesiser with two parameters avaiable: Harmonicity and Modulation Index.
The synthesiser also has a simple ADSR envelope for amplitude envelope of each sound. (TODO)

The Pure Data patch was compiled to WebAssembly using the [webpd](https://github.com/sebpiq/WebPd) library.

## Configuration

After downloading the repo, you must run npm install to install all the dependencies.

Then, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


<small>by Diego de la Fuente</small>
