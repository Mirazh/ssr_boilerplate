import './main.scss';

const run = async () => {
    const text = await Promise.resolve('Hello');

    console.log(text)
}

run();

class Animal {
    static name = 'Animal'
}