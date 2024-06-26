import React from 'react'

function Home() {
  return (
    <>
    <div class="grid">
  <div class="cell">Cell 1</div>
  <div class="cell">Cell 2</div>
  <div class="cell">Cell 3</div>
  <div class="cell">Cell 4</div>
  <div class="cell">Cell 5</div>
  <div class="cell">Cell 6</div>
  <div class="cell">Cell 7</div>
  <div class="cell">Cell 8</div>
  <div class="cell">Cell 9</div>
  <div class="cell">Cell 10</div>
  <div class="cell">Cell 11</div>
  <div class="cell">Cell 12</div>
  <div class="cell">Cell 13</div>
  <div class="cell">Cell 14</div>
  <div class="cell">Cell 15</div>
  <div class="cell">Cell 16</div>
  <div class="cell">Cell 17</div>
  <div class="cell">Cell 18</div>
  <div class="cell">Cell 19</div>
  <div class="cell">Cell 20</div>
  <div class="cell">Cell 21</div>
  <div class="cell">Cell 22</div>
  <div class="cell">Cell 23</div>
  <div class="cell">Cell 24</div>
</div>
<div class="fixed-grid has-4-cols">
  <div class="grid">
    <div class="cell is-primary">Cell 1</div>
    <div class="cell is-col-start-3">Cell 2</div>
    <div class="cell">Cell 3</div>
    <div class="cell">Cell 4</div>
    <div class="cell">Cell 5</div>
    <div class="cell">Cell 6</div>
  </div>
</div>

<div class="fixed-grid has-4-cols">
  <div class="grid">
    <div class="cell">Cell 1</div>
    <div class="cell is-col-span-2">Cell 2</div>
    <div class="cell">Cell 3</div>
    <div class="cell">Cell 4</div>
    <div class="cell">Cell 5</div>
    <div class="cell">Cell 6</div>
  </div>
</div>
</>
  )
}

export default Home