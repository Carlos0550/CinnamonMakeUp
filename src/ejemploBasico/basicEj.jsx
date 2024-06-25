import React from 'react';

const BasicEJ = () => (
  <div>
    <section class="section">
    <div class="container">
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
      <button className='button'>Este es un boton normal</button>
      <button className='button is-primary m-4'>Este es un boton primario</button>
      <button className='button is-link'>Este es un boton link</button>

      <button className='button is-info'>Este es un boton info</button>

      <button className='button is-success'>Este es un boton success</button>

      <button className='button is-warning'>Este es un boton warning</button>
      <button className='button is-danger'>Este es un boton danger</button>

    <p className='subtitle'>Podemos cambiarle el tamaño</p>
    <button class="button is-small">Button</button>
<button class="button">Button</button>
<button class="button is-medium">Button</button>
<button class="button is-large">Button</button>

<p className='subtitle'>Agregarle estados</p>
<button class="button is-primary is-outlined">Button</button>
<button class="button is-loading">Button</button>
<button class="button" disabled>Button</button>

<div class="columns">
  <div class="row">1</div>
  <div class="row">2</div>
  <div class="column">3</div>
  <div class="column">4</div>
  <div class="column">5</div>
</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h1 class="title">Welcome to My Website</h1>
      <div class="columns">
        <div class="column">
          <div class="box">
            <p class="subtitle">Column 1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div class="column">
          <div class="box">
            <p class="subtitle">Column 2</p>
            <p>Nulla facilisi. Sed eget est vitae ipsum interdum elementum.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
);
export default BasicEJ;