# Palette

基于 [Radix Colors](https://www.radix-ui.com/colors) 的色板预览：每色 **1–12** 阶，工具类为 `bg-{color}-{step}`；省略刻度时（如 `bg-blue`）默认 **9** 阶。

概念说明（刻度用途、解析优先级、自定义色）见 [Color](./color.md)。

## Neutral

中性色，用于文本、边框与背景层次。

<div class="color-board">
  <div class="color-board-ruler" aria-hidden="true">
    <div class="color-board-legend">
      <div class="color-board-legend-spacer"></div>
      <div class="color-board-legend-bands">
        <span class="color-band" style="--span:2">Backgrounds</span>
        <span class="color-band" style="--span:3">Interactive</span>
        <span class="color-band" style="--span:3">Borders</span>
        <span class="color-band" style="--span:2">Solid</span>
        <span class="color-band" style="--span:2">Text</span>
      </div>
    </div>
    <div class="color-board-legend color-board-steps">
      <div class="color-board-legend-spacer"></div>
      <div class="color-board-step-nums">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
      </div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Gray</div>
    <div class="color-scale-steps">
      <div class="color-step bg-gray-1" title="bg-gray-1"></div>
      <div class="color-step bg-gray-2" title="bg-gray-2"></div>
      <div class="color-step bg-gray-3" title="bg-gray-3"></div>
      <div class="color-step bg-gray-4" title="bg-gray-4"></div>
      <div class="color-step bg-gray-5" title="bg-gray-5"></div>
      <div class="color-step bg-gray-6" title="bg-gray-6"></div>
      <div class="color-step bg-gray-7" title="bg-gray-7"></div>
      <div class="color-step bg-gray-8" title="bg-gray-8"></div>
      <div class="color-step bg-gray-9" title="bg-gray-9"></div>
      <div class="color-step bg-gray-10" title="bg-gray-10"></div>
      <div class="color-step bg-gray-11" title="bg-gray-11"></div>
      <div class="color-step bg-gray-12" title="bg-gray-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Mauve</div>
    <div class="color-scale-steps">
      <div class="color-step bg-mauve-1" title="bg-mauve-1"></div>
      <div class="color-step bg-mauve-2" title="bg-mauve-2"></div>
      <div class="color-step bg-mauve-3" title="bg-mauve-3"></div>
      <div class="color-step bg-mauve-4" title="bg-mauve-4"></div>
      <div class="color-step bg-mauve-5" title="bg-mauve-5"></div>
      <div class="color-step bg-mauve-6" title="bg-mauve-6"></div>
      <div class="color-step bg-mauve-7" title="bg-mauve-7"></div>
      <div class="color-step bg-mauve-8" title="bg-mauve-8"></div>
      <div class="color-step bg-mauve-9" title="bg-mauve-9"></div>
      <div class="color-step bg-mauve-10" title="bg-mauve-10"></div>
      <div class="color-step bg-mauve-11" title="bg-mauve-11"></div>
      <div class="color-step bg-mauve-12" title="bg-mauve-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Slate</div>
    <div class="color-scale-steps">
      <div class="color-step bg-slate-1" title="bg-slate-1"></div>
      <div class="color-step bg-slate-2" title="bg-slate-2"></div>
      <div class="color-step bg-slate-3" title="bg-slate-3"></div>
      <div class="color-step bg-slate-4" title="bg-slate-4"></div>
      <div class="color-step bg-slate-5" title="bg-slate-5"></div>
      <div class="color-step bg-slate-6" title="bg-slate-6"></div>
      <div class="color-step bg-slate-7" title="bg-slate-7"></div>
      <div class="color-step bg-slate-8" title="bg-slate-8"></div>
      <div class="color-step bg-slate-9" title="bg-slate-9"></div>
      <div class="color-step bg-slate-10" title="bg-slate-10"></div>
      <div class="color-step bg-slate-11" title="bg-slate-11"></div>
      <div class="color-step bg-slate-12" title="bg-slate-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Sage</div>
    <div class="color-scale-steps">
      <div class="color-step bg-sage-1" title="bg-sage-1"></div>
      <div class="color-step bg-sage-2" title="bg-sage-2"></div>
      <div class="color-step bg-sage-3" title="bg-sage-3"></div>
      <div class="color-step bg-sage-4" title="bg-sage-4"></div>
      <div class="color-step bg-sage-5" title="bg-sage-5"></div>
      <div class="color-step bg-sage-6" title="bg-sage-6"></div>
      <div class="color-step bg-sage-7" title="bg-sage-7"></div>
      <div class="color-step bg-sage-8" title="bg-sage-8"></div>
      <div class="color-step bg-sage-9" title="bg-sage-9"></div>
      <div class="color-step bg-sage-10" title="bg-sage-10"></div>
      <div class="color-step bg-sage-11" title="bg-sage-11"></div>
      <div class="color-step bg-sage-12" title="bg-sage-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Olive</div>
    <div class="color-scale-steps">
      <div class="color-step bg-olive-1" title="bg-olive-1"></div>
      <div class="color-step bg-olive-2" title="bg-olive-2"></div>
      <div class="color-step bg-olive-3" title="bg-olive-3"></div>
      <div class="color-step bg-olive-4" title="bg-olive-4"></div>
      <div class="color-step bg-olive-5" title="bg-olive-5"></div>
      <div class="color-step bg-olive-6" title="bg-olive-6"></div>
      <div class="color-step bg-olive-7" title="bg-olive-7"></div>
      <div class="color-step bg-olive-8" title="bg-olive-8"></div>
      <div class="color-step bg-olive-9" title="bg-olive-9"></div>
      <div class="color-step bg-olive-10" title="bg-olive-10"></div>
      <div class="color-step bg-olive-11" title="bg-olive-11"></div>
      <div class="color-step bg-olive-12" title="bg-olive-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Sand</div>
    <div class="color-scale-steps">
      <div class="color-step bg-sand-1" title="bg-sand-1"></div>
      <div class="color-step bg-sand-2" title="bg-sand-2"></div>
      <div class="color-step bg-sand-3" title="bg-sand-3"></div>
      <div class="color-step bg-sand-4" title="bg-sand-4"></div>
      <div class="color-step bg-sand-5" title="bg-sand-5"></div>
      <div class="color-step bg-sand-6" title="bg-sand-6"></div>
      <div class="color-step bg-sand-7" title="bg-sand-7"></div>
      <div class="color-step bg-sand-8" title="bg-sand-8"></div>
      <div class="color-step bg-sand-9" title="bg-sand-9"></div>
      <div class="color-step bg-sand-10" title="bg-sand-10"></div>
      <div class="color-step bg-sand-11" title="bg-sand-11"></div>
      <div class="color-step bg-sand-12" title="bg-sand-12"></div>
    </div>
  </div>
</div>

## Accent

主色，用于按钮、链接与强调元素。

<div class="color-board">
  <div class="color-board-ruler" aria-hidden="true">
    <div class="color-board-legend">
      <div class="color-board-legend-spacer"></div>
      <div class="color-board-legend-bands">
        <span class="color-band" style="--span:2">Backgrounds</span>
        <span class="color-band" style="--span:3">Interactive</span>
        <span class="color-band" style="--span:3">Borders</span>
        <span class="color-band" style="--span:2">Solid</span>
        <span class="color-band" style="--span:2">Text</span>
      </div>
    </div>
    <div class="color-board-legend color-board-steps">
      <div class="color-board-legend-spacer"></div>
      <div class="color-board-step-nums">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
      </div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Tomato</div>
    <div class="color-scale-steps">
      <div class="color-step bg-tomato-1" title="bg-tomato-1"></div>
      <div class="color-step bg-tomato-2" title="bg-tomato-2"></div>
      <div class="color-step bg-tomato-3" title="bg-tomato-3"></div>
      <div class="color-step bg-tomato-4" title="bg-tomato-4"></div>
      <div class="color-step bg-tomato-5" title="bg-tomato-5"></div>
      <div class="color-step bg-tomato-6" title="bg-tomato-6"></div>
      <div class="color-step bg-tomato-7" title="bg-tomato-7"></div>
      <div class="color-step bg-tomato-8" title="bg-tomato-8"></div>
      <div class="color-step bg-tomato-9" title="bg-tomato-9"></div>
      <div class="color-step bg-tomato-10" title="bg-tomato-10"></div>
      <div class="color-step bg-tomato-11" title="bg-tomato-11"></div>
      <div class="color-step bg-tomato-12" title="bg-tomato-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Red</div>
    <div class="color-scale-steps">
      <div class="color-step bg-red-1" title="bg-red-1"></div>
      <div class="color-step bg-red-2" title="bg-red-2"></div>
      <div class="color-step bg-red-3" title="bg-red-3"></div>
      <div class="color-step bg-red-4" title="bg-red-4"></div>
      <div class="color-step bg-red-5" title="bg-red-5"></div>
      <div class="color-step bg-red-6" title="bg-red-6"></div>
      <div class="color-step bg-red-7" title="bg-red-7"></div>
      <div class="color-step bg-red-8" title="bg-red-8"></div>
      <div class="color-step bg-red-9" title="bg-red-9"></div>
      <div class="color-step bg-red-10" title="bg-red-10"></div>
      <div class="color-step bg-red-11" title="bg-red-11"></div>
      <div class="color-step bg-red-12" title="bg-red-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Ruby</div>
    <div class="color-scale-steps">
      <div class="color-step bg-ruby-1" title="bg-ruby-1"></div>
      <div class="color-step bg-ruby-2" title="bg-ruby-2"></div>
      <div class="color-step bg-ruby-3" title="bg-ruby-3"></div>
      <div class="color-step bg-ruby-4" title="bg-ruby-4"></div>
      <div class="color-step bg-ruby-5" title="bg-ruby-5"></div>
      <div class="color-step bg-ruby-6" title="bg-ruby-6"></div>
      <div class="color-step bg-ruby-7" title="bg-ruby-7"></div>
      <div class="color-step bg-ruby-8" title="bg-ruby-8"></div>
      <div class="color-step bg-ruby-9" title="bg-ruby-9"></div>
      <div class="color-step bg-ruby-10" title="bg-ruby-10"></div>
      <div class="color-step bg-ruby-11" title="bg-ruby-11"></div>
      <div class="color-step bg-ruby-12" title="bg-ruby-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Crimson</div>
    <div class="color-scale-steps">
      <div class="color-step bg-crimson-1" title="bg-crimson-1"></div>
      <div class="color-step bg-crimson-2" title="bg-crimson-2"></div>
      <div class="color-step bg-crimson-3" title="bg-crimson-3"></div>
      <div class="color-step bg-crimson-4" title="bg-crimson-4"></div>
      <div class="color-step bg-crimson-5" title="bg-crimson-5"></div>
      <div class="color-step bg-crimson-6" title="bg-crimson-6"></div>
      <div class="color-step bg-crimson-7" title="bg-crimson-7"></div>
      <div class="color-step bg-crimson-8" title="bg-crimson-8"></div>
      <div class="color-step bg-crimson-9" title="bg-crimson-9"></div>
      <div class="color-step bg-crimson-10" title="bg-crimson-10"></div>
      <div class="color-step bg-crimson-11" title="bg-crimson-11"></div>
      <div class="color-step bg-crimson-12" title="bg-crimson-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Pink</div>
    <div class="color-scale-steps">
      <div class="color-step bg-pink-1" title="bg-pink-1"></div>
      <div class="color-step bg-pink-2" title="bg-pink-2"></div>
      <div class="color-step bg-pink-3" title="bg-pink-3"></div>
      <div class="color-step bg-pink-4" title="bg-pink-4"></div>
      <div class="color-step bg-pink-5" title="bg-pink-5"></div>
      <div class="color-step bg-pink-6" title="bg-pink-6"></div>
      <div class="color-step bg-pink-7" title="bg-pink-7"></div>
      <div class="color-step bg-pink-8" title="bg-pink-8"></div>
      <div class="color-step bg-pink-9" title="bg-pink-9"></div>
      <div class="color-step bg-pink-10" title="bg-pink-10"></div>
      <div class="color-step bg-pink-11" title="bg-pink-11"></div>
      <div class="color-step bg-pink-12" title="bg-pink-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Plum</div>
    <div class="color-scale-steps">
      <div class="color-step bg-plum-1" title="bg-plum-1"></div>
      <div class="color-step bg-plum-2" title="bg-plum-2"></div>
      <div class="color-step bg-plum-3" title="bg-plum-3"></div>
      <div class="color-step bg-plum-4" title="bg-plum-4"></div>
      <div class="color-step bg-plum-5" title="bg-plum-5"></div>
      <div class="color-step bg-plum-6" title="bg-plum-6"></div>
      <div class="color-step bg-plum-7" title="bg-plum-7"></div>
      <div class="color-step bg-plum-8" title="bg-plum-8"></div>
      <div class="color-step bg-plum-9" title="bg-plum-9"></div>
      <div class="color-step bg-plum-10" title="bg-plum-10"></div>
      <div class="color-step bg-plum-11" title="bg-plum-11"></div>
      <div class="color-step bg-plum-12" title="bg-plum-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Purple</div>
    <div class="color-scale-steps">
      <div class="color-step bg-purple-1" title="bg-purple-1"></div>
      <div class="color-step bg-purple-2" title="bg-purple-2"></div>
      <div class="color-step bg-purple-3" title="bg-purple-3"></div>
      <div class="color-step bg-purple-4" title="bg-purple-4"></div>
      <div class="color-step bg-purple-5" title="bg-purple-5"></div>
      <div class="color-step bg-purple-6" title="bg-purple-6"></div>
      <div class="color-step bg-purple-7" title="bg-purple-7"></div>
      <div class="color-step bg-purple-8" title="bg-purple-8"></div>
      <div class="color-step bg-purple-9" title="bg-purple-9"></div>
      <div class="color-step bg-purple-10" title="bg-purple-10"></div>
      <div class="color-step bg-purple-11" title="bg-purple-11"></div>
      <div class="color-step bg-purple-12" title="bg-purple-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Violet</div>
    <div class="color-scale-steps">
      <div class="color-step bg-violet-1" title="bg-violet-1"></div>
      <div class="color-step bg-violet-2" title="bg-violet-2"></div>
      <div class="color-step bg-violet-3" title="bg-violet-3"></div>
      <div class="color-step bg-violet-4" title="bg-violet-4"></div>
      <div class="color-step bg-violet-5" title="bg-violet-5"></div>
      <div class="color-step bg-violet-6" title="bg-violet-6"></div>
      <div class="color-step bg-violet-7" title="bg-violet-7"></div>
      <div class="color-step bg-violet-8" title="bg-violet-8"></div>
      <div class="color-step bg-violet-9" title="bg-violet-9"></div>
      <div class="color-step bg-violet-10" title="bg-violet-10"></div>
      <div class="color-step bg-violet-11" title="bg-violet-11"></div>
      <div class="color-step bg-violet-12" title="bg-violet-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Iris</div>
    <div class="color-scale-steps">
      <div class="color-step bg-iris-1" title="bg-iris-1"></div>
      <div class="color-step bg-iris-2" title="bg-iris-2"></div>
      <div class="color-step bg-iris-3" title="bg-iris-3"></div>
      <div class="color-step bg-iris-4" title="bg-iris-4"></div>
      <div class="color-step bg-iris-5" title="bg-iris-5"></div>
      <div class="color-step bg-iris-6" title="bg-iris-6"></div>
      <div class="color-step bg-iris-7" title="bg-iris-7"></div>
      <div class="color-step bg-iris-8" title="bg-iris-8"></div>
      <div class="color-step bg-iris-9" title="bg-iris-9"></div>
      <div class="color-step bg-iris-10" title="bg-iris-10"></div>
      <div class="color-step bg-iris-11" title="bg-iris-11"></div>
      <div class="color-step bg-iris-12" title="bg-iris-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Indigo</div>
    <div class="color-scale-steps">
      <div class="color-step bg-indigo-1" title="bg-indigo-1"></div>
      <div class="color-step bg-indigo-2" title="bg-indigo-2"></div>
      <div class="color-step bg-indigo-3" title="bg-indigo-3"></div>
      <div class="color-step bg-indigo-4" title="bg-indigo-4"></div>
      <div class="color-step bg-indigo-5" title="bg-indigo-5"></div>
      <div class="color-step bg-indigo-6" title="bg-indigo-6"></div>
      <div class="color-step bg-indigo-7" title="bg-indigo-7"></div>
      <div class="color-step bg-indigo-8" title="bg-indigo-8"></div>
      <div class="color-step bg-indigo-9" title="bg-indigo-9"></div>
      <div class="color-step bg-indigo-10" title="bg-indigo-10"></div>
      <div class="color-step bg-indigo-11" title="bg-indigo-11"></div>
      <div class="color-step bg-indigo-12" title="bg-indigo-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Blue</div>
    <div class="color-scale-steps">
      <div class="color-step bg-blue-1" title="bg-blue-1"></div>
      <div class="color-step bg-blue-2" title="bg-blue-2"></div>
      <div class="color-step bg-blue-3" title="bg-blue-3"></div>
      <div class="color-step bg-blue-4" title="bg-blue-4"></div>
      <div class="color-step bg-blue-5" title="bg-blue-5"></div>
      <div class="color-step bg-blue-6" title="bg-blue-6"></div>
      <div class="color-step bg-blue-7" title="bg-blue-7"></div>
      <div class="color-step bg-blue-8" title="bg-blue-8"></div>
      <div class="color-step bg-blue-9" title="bg-blue-9"></div>
      <div class="color-step bg-blue-10" title="bg-blue-10"></div>
      <div class="color-step bg-blue-11" title="bg-blue-11"></div>
      <div class="color-step bg-blue-12" title="bg-blue-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Cyan</div>
    <div class="color-scale-steps">
      <div class="color-step bg-cyan-1" title="bg-cyan-1"></div>
      <div class="color-step bg-cyan-2" title="bg-cyan-2"></div>
      <div class="color-step bg-cyan-3" title="bg-cyan-3"></div>
      <div class="color-step bg-cyan-4" title="bg-cyan-4"></div>
      <div class="color-step bg-cyan-5" title="bg-cyan-5"></div>
      <div class="color-step bg-cyan-6" title="bg-cyan-6"></div>
      <div class="color-step bg-cyan-7" title="bg-cyan-7"></div>
      <div class="color-step bg-cyan-8" title="bg-cyan-8"></div>
      <div class="color-step bg-cyan-9" title="bg-cyan-9"></div>
      <div class="color-step bg-cyan-10" title="bg-cyan-10"></div>
      <div class="color-step bg-cyan-11" title="bg-cyan-11"></div>
      <div class="color-step bg-cyan-12" title="bg-cyan-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Teal</div>
    <div class="color-scale-steps">
      <div class="color-step bg-teal-1" title="bg-teal-1"></div>
      <div class="color-step bg-teal-2" title="bg-teal-2"></div>
      <div class="color-step bg-teal-3" title="bg-teal-3"></div>
      <div class="color-step bg-teal-4" title="bg-teal-4"></div>
      <div class="color-step bg-teal-5" title="bg-teal-5"></div>
      <div class="color-step bg-teal-6" title="bg-teal-6"></div>
      <div class="color-step bg-teal-7" title="bg-teal-7"></div>
      <div class="color-step bg-teal-8" title="bg-teal-8"></div>
      <div class="color-step bg-teal-9" title="bg-teal-9"></div>
      <div class="color-step bg-teal-10" title="bg-teal-10"></div>
      <div class="color-step bg-teal-11" title="bg-teal-11"></div>
      <div class="color-step bg-teal-12" title="bg-teal-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Jade</div>
    <div class="color-scale-steps">
      <div class="color-step bg-jade-1" title="bg-jade-1"></div>
      <div class="color-step bg-jade-2" title="bg-jade-2"></div>
      <div class="color-step bg-jade-3" title="bg-jade-3"></div>
      <div class="color-step bg-jade-4" title="bg-jade-4"></div>
      <div class="color-step bg-jade-5" title="bg-jade-5"></div>
      <div class="color-step bg-jade-6" title="bg-jade-6"></div>
      <div class="color-step bg-jade-7" title="bg-jade-7"></div>
      <div class="color-step bg-jade-8" title="bg-jade-8"></div>
      <div class="color-step bg-jade-9" title="bg-jade-9"></div>
      <div class="color-step bg-jade-10" title="bg-jade-10"></div>
      <div class="color-step bg-jade-11" title="bg-jade-11"></div>
      <div class="color-step bg-jade-12" title="bg-jade-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Green</div>
    <div class="color-scale-steps">
      <div class="color-step bg-green-1" title="bg-green-1"></div>
      <div class="color-step bg-green-2" title="bg-green-2"></div>
      <div class="color-step bg-green-3" title="bg-green-3"></div>
      <div class="color-step bg-green-4" title="bg-green-4"></div>
      <div class="color-step bg-green-5" title="bg-green-5"></div>
      <div class="color-step bg-green-6" title="bg-green-6"></div>
      <div class="color-step bg-green-7" title="bg-green-7"></div>
      <div class="color-step bg-green-8" title="bg-green-8"></div>
      <div class="color-step bg-green-9" title="bg-green-9"></div>
      <div class="color-step bg-green-10" title="bg-green-10"></div>
      <div class="color-step bg-green-11" title="bg-green-11"></div>
      <div class="color-step bg-green-12" title="bg-green-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Grass</div>
    <div class="color-scale-steps">
      <div class="color-step bg-grass-1" title="bg-grass-1"></div>
      <div class="color-step bg-grass-2" title="bg-grass-2"></div>
      <div class="color-step bg-grass-3" title="bg-grass-3"></div>
      <div class="color-step bg-grass-4" title="bg-grass-4"></div>
      <div class="color-step bg-grass-5" title="bg-grass-5"></div>
      <div class="color-step bg-grass-6" title="bg-grass-6"></div>
      <div class="color-step bg-grass-7" title="bg-grass-7"></div>
      <div class="color-step bg-grass-8" title="bg-grass-8"></div>
      <div class="color-step bg-grass-9" title="bg-grass-9"></div>
      <div class="color-step bg-grass-10" title="bg-grass-10"></div>
      <div class="color-step bg-grass-11" title="bg-grass-11"></div>
      <div class="color-step bg-grass-12" title="bg-grass-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Bronze</div>
    <div class="color-scale-steps">
      <div class="color-step bg-bronze-1" title="bg-bronze-1"></div>
      <div class="color-step bg-bronze-2" title="bg-bronze-2"></div>
      <div class="color-step bg-bronze-3" title="bg-bronze-3"></div>
      <div class="color-step bg-bronze-4" title="bg-bronze-4"></div>
      <div class="color-step bg-bronze-5" title="bg-bronze-5"></div>
      <div class="color-step bg-bronze-6" title="bg-bronze-6"></div>
      <div class="color-step bg-bronze-7" title="bg-bronze-7"></div>
      <div class="color-step bg-bronze-8" title="bg-bronze-8"></div>
      <div class="color-step bg-bronze-9" title="bg-bronze-9"></div>
      <div class="color-step bg-bronze-10" title="bg-bronze-10"></div>
      <div class="color-step bg-bronze-11" title="bg-bronze-11"></div>
      <div class="color-step bg-bronze-12" title="bg-bronze-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Gold</div>
    <div class="color-scale-steps">
      <div class="color-step bg-gold-1" title="bg-gold-1"></div>
      <div class="color-step bg-gold-2" title="bg-gold-2"></div>
      <div class="color-step bg-gold-3" title="bg-gold-3"></div>
      <div class="color-step bg-gold-4" title="bg-gold-4"></div>
      <div class="color-step bg-gold-5" title="bg-gold-5"></div>
      <div class="color-step bg-gold-6" title="bg-gold-6"></div>
      <div class="color-step bg-gold-7" title="bg-gold-7"></div>
      <div class="color-step bg-gold-8" title="bg-gold-8"></div>
      <div class="color-step bg-gold-9" title="bg-gold-9"></div>
      <div class="color-step bg-gold-10" title="bg-gold-10"></div>
      <div class="color-step bg-gold-11" title="bg-gold-11"></div>
      <div class="color-step bg-gold-12" title="bg-gold-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Brown</div>
    <div class="color-scale-steps">
      <div class="color-step bg-brown-1" title="bg-brown-1"></div>
      <div class="color-step bg-brown-2" title="bg-brown-2"></div>
      <div class="color-step bg-brown-3" title="bg-brown-3"></div>
      <div class="color-step bg-brown-4" title="bg-brown-4"></div>
      <div class="color-step bg-brown-5" title="bg-brown-5"></div>
      <div class="color-step bg-brown-6" title="bg-brown-6"></div>
      <div class="color-step bg-brown-7" title="bg-brown-7"></div>
      <div class="color-step bg-brown-8" title="bg-brown-8"></div>
      <div class="color-step bg-brown-9" title="bg-brown-9"></div>
      <div class="color-step bg-brown-10" title="bg-brown-10"></div>
      <div class="color-step bg-brown-11" title="bg-brown-11"></div>
      <div class="color-step bg-brown-12" title="bg-brown-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Orange</div>
    <div class="color-scale-steps">
      <div class="color-step bg-orange-1" title="bg-orange-1"></div>
      <div class="color-step bg-orange-2" title="bg-orange-2"></div>
      <div class="color-step bg-orange-3" title="bg-orange-3"></div>
      <div class="color-step bg-orange-4" title="bg-orange-4"></div>
      <div class="color-step bg-orange-5" title="bg-orange-5"></div>
      <div class="color-step bg-orange-6" title="bg-orange-6"></div>
      <div class="color-step bg-orange-7" title="bg-orange-7"></div>
      <div class="color-step bg-orange-8" title="bg-orange-8"></div>
      <div class="color-step bg-orange-9" title="bg-orange-9"></div>
      <div class="color-step bg-orange-10" title="bg-orange-10"></div>
      <div class="color-step bg-orange-11" title="bg-orange-11"></div>
      <div class="color-step bg-orange-12" title="bg-orange-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Amber</div>
    <div class="color-scale-steps">
      <div class="color-step bg-amber-1" title="bg-amber-1"></div>
      <div class="color-step bg-amber-2" title="bg-amber-2"></div>
      <div class="color-step bg-amber-3" title="bg-amber-3"></div>
      <div class="color-step bg-amber-4" title="bg-amber-4"></div>
      <div class="color-step bg-amber-5" title="bg-amber-5"></div>
      <div class="color-step bg-amber-6" title="bg-amber-6"></div>
      <div class="color-step bg-amber-7" title="bg-amber-7"></div>
      <div class="color-step bg-amber-8" title="bg-amber-8"></div>
      <div class="color-step bg-amber-9" title="bg-amber-9"></div>
      <div class="color-step bg-amber-10" title="bg-amber-10"></div>
      <div class="color-step bg-amber-11" title="bg-amber-11"></div>
      <div class="color-step bg-amber-12" title="bg-amber-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Yellow</div>
    <div class="color-scale-steps">
      <div class="color-step bg-yellow-1" title="bg-yellow-1"></div>
      <div class="color-step bg-yellow-2" title="bg-yellow-2"></div>
      <div class="color-step bg-yellow-3" title="bg-yellow-3"></div>
      <div class="color-step bg-yellow-4" title="bg-yellow-4"></div>
      <div class="color-step bg-yellow-5" title="bg-yellow-5"></div>
      <div class="color-step bg-yellow-6" title="bg-yellow-6"></div>
      <div class="color-step bg-yellow-7" title="bg-yellow-7"></div>
      <div class="color-step bg-yellow-8" title="bg-yellow-8"></div>
      <div class="color-step bg-yellow-9" title="bg-yellow-9"></div>
      <div class="color-step bg-yellow-10" title="bg-yellow-10"></div>
      <div class="color-step bg-yellow-11" title="bg-yellow-11"></div>
      <div class="color-step bg-yellow-12" title="bg-yellow-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Lime</div>
    <div class="color-scale-steps">
      <div class="color-step bg-lime-1" title="bg-lime-1"></div>
      <div class="color-step bg-lime-2" title="bg-lime-2"></div>
      <div class="color-step bg-lime-3" title="bg-lime-3"></div>
      <div class="color-step bg-lime-4" title="bg-lime-4"></div>
      <div class="color-step bg-lime-5" title="bg-lime-5"></div>
      <div class="color-step bg-lime-6" title="bg-lime-6"></div>
      <div class="color-step bg-lime-7" title="bg-lime-7"></div>
      <div class="color-step bg-lime-8" title="bg-lime-8"></div>
      <div class="color-step bg-lime-9" title="bg-lime-9"></div>
      <div class="color-step bg-lime-10" title="bg-lime-10"></div>
      <div class="color-step bg-lime-11" title="bg-lime-11"></div>
      <div class="color-step bg-lime-12" title="bg-lime-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Mint</div>
    <div class="color-scale-steps">
      <div class="color-step bg-mint-1" title="bg-mint-1"></div>
      <div class="color-step bg-mint-2" title="bg-mint-2"></div>
      <div class="color-step bg-mint-3" title="bg-mint-3"></div>
      <div class="color-step bg-mint-4" title="bg-mint-4"></div>
      <div class="color-step bg-mint-5" title="bg-mint-5"></div>
      <div class="color-step bg-mint-6" title="bg-mint-6"></div>
      <div class="color-step bg-mint-7" title="bg-mint-7"></div>
      <div class="color-step bg-mint-8" title="bg-mint-8"></div>
      <div class="color-step bg-mint-9" title="bg-mint-9"></div>
      <div class="color-step bg-mint-10" title="bg-mint-10"></div>
      <div class="color-step bg-mint-11" title="bg-mint-11"></div>
      <div class="color-step bg-mint-12" title="bg-mint-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">Sky</div>
    <div class="color-scale-steps">
      <div class="color-step bg-sky-1" title="bg-sky-1"></div>
      <div class="color-step bg-sky-2" title="bg-sky-2"></div>
      <div class="color-step bg-sky-3" title="bg-sky-3"></div>
      <div class="color-step bg-sky-4" title="bg-sky-4"></div>
      <div class="color-step bg-sky-5" title="bg-sky-5"></div>
      <div class="color-step bg-sky-6" title="bg-sky-6"></div>
      <div class="color-step bg-sky-7" title="bg-sky-7"></div>
      <div class="color-step bg-sky-8" title="bg-sky-8"></div>
      <div class="color-step bg-sky-9" title="bg-sky-9"></div>
      <div class="color-step bg-sky-10" title="bg-sky-10"></div>
      <div class="color-step bg-sky-11" title="bg-sky-11"></div>
      <div class="color-step bg-sky-12" title="bg-sky-12"></div>
    </div>
  </div>
</div>

## Additional

由单色 hex 自动生成完整 12 阶的额外色。

### Additional Accent

<div class="color-board">
  <div class="color-board-ruler" aria-hidden="true">
    <div class="color-board-legend">
      <div class="color-board-legend-spacer"></div>
      <div class="color-board-legend-bands">
        <span class="color-band" style="--span:2">Backgrounds</span>
        <span class="color-band" style="--span:3">Interactive</span>
        <span class="color-band" style="--span:3">Borders</span>
        <span class="color-band" style="--span:2">Solid</span>
        <span class="color-band" style="--span:2">Text</span>
      </div>
    </div>
    <div class="color-board-legend color-board-steps">
      <div class="color-board-legend-spacer"></div>
      <div class="color-board-step-nums">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
      </div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">
      <span>Clay</span>
      <code>#d97757</code>
    </div>
    <div class="color-scale-steps">
      <div class="color-step bg-clay-1" title="bg-clay-1"></div>
      <div class="color-step bg-clay-2" title="bg-clay-2"></div>
      <div class="color-step bg-clay-3" title="bg-clay-3"></div>
      <div class="color-step bg-clay-4" title="bg-clay-4"></div>
      <div class="color-step bg-clay-5" title="bg-clay-5"></div>
      <div class="color-step bg-clay-6" title="bg-clay-6"></div>
      <div class="color-step bg-clay-7" title="bg-clay-7"></div>
      <div class="color-step bg-clay-8" title="bg-clay-8"></div>
      <div class="color-step bg-clay-9" title="bg-clay-9"></div>
      <div class="color-step bg-clay-10" title="bg-clay-10"></div>
      <div class="color-step bg-clay-11" title="bg-clay-11"></div>
      <div class="color-step bg-clay-12" title="bg-clay-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">
      <span>Ocean</span>
      <code>#05f</code>
    </div>
    <div class="color-scale-steps">
      <div class="color-step bg-ocean-1" title="bg-ocean-1"></div>
      <div class="color-step bg-ocean-2" title="bg-ocean-2"></div>
      <div class="color-step bg-ocean-3" title="bg-ocean-3"></div>
      <div class="color-step bg-ocean-4" title="bg-ocean-4"></div>
      <div class="color-step bg-ocean-5" title="bg-ocean-5"></div>
      <div class="color-step bg-ocean-6" title="bg-ocean-6"></div>
      <div class="color-step bg-ocean-7" title="bg-ocean-7"></div>
      <div class="color-step bg-ocean-8" title="bg-ocean-8"></div>
      <div class="color-step bg-ocean-9" title="bg-ocean-9"></div>
      <div class="color-step bg-ocean-10" title="bg-ocean-10"></div>
      <div class="color-step bg-ocean-11" title="bg-ocean-11"></div>
      <div class="color-step bg-ocean-12" title="bg-ocean-12"></div>
    </div>
  </div>
</div>

### Additional Neutral

<div class="color-board">
  <div class="color-board-ruler" aria-hidden="true">
    <div class="color-board-legend">
      <div class="color-board-legend-spacer"></div>
      <div class="color-board-legend-bands">
        <span class="color-band" style="--span:2">Backgrounds</span>
        <span class="color-band" style="--span:3">Interactive</span>
        <span class="color-band" style="--span:3">Borders</span>
        <span class="color-band" style="--span:2">Solid</span>
        <span class="color-band" style="--span:2">Text</span>
      </div>
    </div>
    <div class="color-board-legend color-board-steps">
      <div class="color-board-legend-spacer"></div>
      <div class="color-board-step-nums">
        <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
      </div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">
      <span>Iron</span>
      <code>#86909c</code>
    </div>
    <div class="color-scale-steps">
      <div class="color-step bg-iron-1" title="bg-iron-1"></div>
      <div class="color-step bg-iron-2" title="bg-iron-2"></div>
      <div class="color-step bg-iron-3" title="bg-iron-3"></div>
      <div class="color-step bg-iron-4" title="bg-iron-4"></div>
      <div class="color-step bg-iron-5" title="bg-iron-5"></div>
      <div class="color-step bg-iron-6" title="bg-iron-6"></div>
      <div class="color-step bg-iron-7" title="bg-iron-7"></div>
      <div class="color-step bg-iron-8" title="bg-iron-8"></div>
      <div class="color-step bg-iron-9" title="bg-iron-9"></div>
      <div class="color-step bg-iron-10" title="bg-iron-10"></div>
      <div class="color-step bg-iron-11" title="bg-iron-11"></div>
      <div class="color-step bg-iron-12" title="bg-iron-12"></div>
    </div>
  </div>
  <div class="color-scale">
    <div class="color-scale-name">
      <span>Gunmetal</span>
      <code>#1d2129</code>
    </div>
    <div class="color-scale-steps">
      <div class="color-step bg-gunmetal-1" title="bg-gunmetal-1"></div>
      <div class="color-step bg-gunmetal-2" title="bg-gunmetal-2"></div>
      <div class="color-step bg-gunmetal-3" title="bg-gunmetal-3"></div>
      <div class="color-step bg-gunmetal-4" title="bg-gunmetal-4"></div>
      <div class="color-step bg-gunmetal-5" title="bg-gunmetal-5"></div>
      <div class="color-step bg-gunmetal-6" title="bg-gunmetal-6"></div>
      <div class="color-step bg-gunmetal-7" title="bg-gunmetal-7"></div>
      <div class="color-step bg-gunmetal-8" title="bg-gunmetal-8"></div>
      <div class="color-step bg-gunmetal-9" title="bg-gunmetal-9"></div>
      <div class="color-step bg-gunmetal-10" title="bg-gunmetal-10"></div>
      <div class="color-step bg-gunmetal-11" title="bg-gunmetal-11"></div>
      <div class="color-step bg-gunmetal-12" title="bg-gunmetal-12"></div>
    </div>
  </div>
</div>

<style>
.color-board {
  --label-w: 5.75rem;
  --row-gap: 0.35rem;
  --board-pad-x: 0.9rem;
  --board-pad-y: 0.85rem;
  --board-radius: calc(var(--docs-radius) + 2px);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--row-gap);
  margin: 0.85rem 0 1.75rem;
  padding: var(--board-pad-y) var(--board-pad-x) 1rem;
  border: 1px solid var(--docs-border);
  border-radius: var(--board-radius);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--docs-bg-soft) 72%, transparent), transparent 42%),
    var(--docs-bg);
  /* keep overflow visible so sticky 1–12 ruler can pin while scrolling the board */
}

.color-board-ruler {
  position: sticky;
  top: calc(var(--docs-topbar-height) + 0.35rem);
  z-index: 4;
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  margin: calc(var(--board-pad-y) * -1) calc(var(--board-pad-x) * -1) 0.45rem;
  padding: 0.7rem var(--board-pad-x) 0.5rem;
  /* match board outer curve (minus 1px border) so background doesn't square-cut the corners */
  border-radius: calc(var(--board-radius) - 1px) calc(var(--board-radius) - 1px) 0 0;
  background: color-mix(in srgb, var(--docs-bg) 92%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid color-mix(in srgb, var(--docs-border-strong) 80%, transparent);
  box-shadow: 0 8px 18px color-mix(in srgb, var(--docs-bg) 55%, transparent);
}

.color-board-legend,
.color-scale {
  display: grid;
  grid-template-columns: var(--label-w) minmax(18rem, 1fr);
  gap: 0.65rem;
  align-items: center;
  min-width: 36rem;
}

.color-board-legend {
  align-items: end;
}

.color-board-legend-spacer {
  width: var(--label-w);
}

.color-board-legend-bands,
.color-board-step-nums,
.color-scale-steps {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 2px;
}

.color-board-legend-bands {
  padding: 0 1px;
}

.color-band {
  grid-column: span var(--span);
  font-family: var(--docs-font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--docs-muted);
  text-align: center;
  line-height: 1.2;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid color-mix(in srgb, var(--docs-border-strong) 70%, transparent);
}

.color-board-step-nums span {
  font-family: var(--docs-font-mono);
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
  color: var(--docs-ink-soft);
  text-align: center;
  line-height: 1;
}

.color-scale-name {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  font-size: 0.84rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--docs-ink);
  line-height: 1.2;
}

.color-scale-name code {
  width: fit-content;
  font-size: 0.62rem !important;
  font-weight: 400;
  padding: 0.05rem 0.28rem !important;
  color: var(--docs-muted) !important;
  background: transparent !important;
  border-color: var(--docs-border) !important;
}

.color-scale-steps {
  height: 2rem;
}

.color-step {
  position: relative;
  min-width: 0;
  height: 100%;
  cursor: default;
  transition: transform 140ms ease, box-shadow 140ms ease, z-index 0s;
}

.color-step:first-child {
  border-radius: 0.4rem 0 0 0.4rem;
}

.color-step:last-child {
  border-radius: 0 0.4rem 0.4rem 0;
}

.color-scale:hover .color-step {
  opacity: 0.88;
}

.color-scale:hover .color-step:hover {
  opacity: 1;
  z-index: 2;
  transform: translateY(-2px) scaleY(1.18);
  box-shadow: 0 6px 16px color-mix(in srgb, #000 22%, transparent);
  border-radius: 0.35rem;
}

@media (max-width: 720px) {
  .color-board {
    --label-w: 4.5rem;
    --board-pad-x: 0.65rem;
    --board-pad-y: 0.7rem;
  }

  .color-scale-steps {
    height: 1.65rem;
  }

  .color-board-step-nums span {
    font-size: 0.64rem;
  }
}
</style>
