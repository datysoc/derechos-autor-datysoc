<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import { COLORS } from '../resources/colors';

  $: privacyPolicy = css`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 20px 120px;
    max-width: 65%;
    margin: 0 auto;
  `;

  $: title = css`
    font-size: 32px;
    color: ${COLORS.gray};
    font-weight: 700;
    font-family: "Space Mono", serif, arial;
    padding: 4px 20px;
    background-color: ${COLORS.orange};
  `; 

  $: description = css`
    font-size: 22px;
    color: ${COLORS.gray};
    line-height: 36px;
  `;
</script>

<main class={privacyPolicy}>
  <h2 class={title}>
    Política de Privacidad
  </h2>

  <p class={description}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et orci eu felis consectetur porttitor in vitae turpis. Mauris quis nibh nisi. Praesent quis libero porta, scelerisque erat viverra, finibus libero. Sed pellentesque finibus aliquam. Aenean molestie ac enim eu ornare. Cras tincidunt tincidunt sagittis. Sed auctor, velit ut pretium aliquam, justo tortor ultricies erat, eget tempor lacus felis nec urna. Cras facilisis enim a magna iaculis egestas.
  </p>

  <p class={description}>
    Aenean dapibus leo in ex molestie efficitur quis vitae ex. Vestibulum eu lectus neque. Maecenas dapibus nisl quis nisl pellentesque, sit amet consectetur nibh accumsan. Sed venenatis vitae ligula ac molestie. Vestibulum felis urna, luctus varius tincidunt sit amet, feugiat sit amet nisi. In vitae nibh lectus. Proin id ante suscipit, tristique justo id, pretium lectus. Quisque non bibendum tortor. Vivamus vel felis dapibus, pretium ante et, vulputate diam. Integer id quam velit. Aenean ullamcorper metus velit, quis accumsan dui placerat at. Integer tempor arcu odio, vitae venenatis felis tristique porttitor. Duis ac augue quam. Proin felis libero, ullamcorper sit amet est quis, dapibus malesuada felis.
  </p>
</main>
