import React from 'react';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

const Blog = () => {
    return (
        <div>
            <Navbar background="white" font="black" />
            <div className='w-4/5 mx-auto  min-h-screen py-20 2xl:pt-28'>
                <div className='my-5'>
                    <h1 className='text-xl font-semibold'>How will you improve the performance of a React Application?</h1>
                    <ul>
                        <li>1. Dependency optimization is use dependencies with right way on hooks can improve application.</li>
                        <li>2. Code optimization is divide your page part into small components, it helps stop unnecessary loading.</li>
                        <li>3. Try to use unnecessary libraries</li>
                        <li>4. Using immutable data structures can be improve react application.</li>
                    </ul>
                </div>
                <div className='my-5'>
                    <h1 className='text-xl font-semibold'>What are the different ways to manage a state in a React application?</h1>
                    <ul>
                        <li>1. There are several ways to manage states in react js. Like, The reducer function gives you one centralized place to intercept “actions” and update the state accordingly,so it help to container much more heaviest containing object.</li>
                        <li>2. If prop drilling need, just avoid it and using Context API.</li>
                        <li>3. Also there some third party libraries like Redux, LogRocket, MobX etc.</li>
                    </ul>
                </div>
                <div className='my-5'>
                    <h1 className='text-xl font-semibold'>How does prototypical inheritance work?</h1>
                    <p>Prototypical inheritance is that a object consumes other objects properties into itself.Like When we are trying to read a object property , which is missing or does not exist javascript automatically takes it from the prototype.</p>
                </div>
                <div className='my-5'>
                    <h1 className='text-xl font-semibold'>Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts?</h1>
                    <p>We use dispatch function in useState because when we declare a useState it return two thing - a variable and a dispatch function to update the variable. So React memorized it and compares previous value with current value. that's why dispatch function is used, otherwise state value will be destroyed.</p>
                </div>
                <div className='my-5'>
                    <h1 className='text-xl font-semibold'>What is a unit test? Why should write unit tests?</h1>
                    <p>UNIT TESTING is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. <br /> Unit tests help to fix bugs early in the development cycle and save costs. It helps the developers to understand the testing code base and enables them to make changes quickly</p>
                </div>
            </div>
            <div><Footer /></div>
        </div>
    );
};

export default Blog;