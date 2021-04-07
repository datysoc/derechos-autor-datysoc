<script>
  import { css } from '../../node_modules/@emotion/css/dist/emotion-css.umd.min.js';
  import Footer from '../components/Footer.svelte';
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
    border-bottom: solid 2px ${COLORS.orange};
  `; 

  $: subtitle = css`
    font-size: 26px;
    color: ${COLORS.gray};
    font-weight: 500;
    font-family: "Space Mono", serif, arial;
    padding: 4px 20px;
    align-self: flex-start;
    margin: 0;
  `; 

  $: yellow = css`
    color: ${COLORS.yellow};
    font-size: 38px;
  `;

  $: violet = css`
    color: ${COLORS.violet};
    font-size: 38px;
  `;

  $: pink = css`
    color: ${COLORS.pink};
    font-size: 38px;
  `;

  $: blue = css`
    color: ${COLORS.blue};
    font-size: 38px;
  `;

  $: green = css`
    color: ${COLORS.green};
    font-size: 38px;
  `;

  $: red = css`
    color: ${COLORS.red};
    font-size: 38px;
  `;

  $: orange = css`
    color: ${COLORS.orange};
    font-size: 38px;
  `;

  $: description = css`
    font-size: 22px;
    color: ${COLORS.gray20};
    line-height: 36px;
  `;
</script>

<main class={privacyPolicy}>
  <h2 class={title}>
    Permisos de uso y privacidad
  </h2>

  <h3 class={subtitle}>
    <span class={yellow}>•</span>
    Fuente de los datos
  </h3>

  <p class={description}>
    Los datos utilizados en este sitio son provistos por diversas fuentes que a continuación se detallan: Informe de la situación de las flexibilidades del derecho de autor en América Latina, vídeos, podcasts, análisis y visualizaciones generados por el equipo de Datysoc y Fundación Karisma.
  </p>

  <h3 class={subtitle}>
    <span class={blue}>•</span>
    Información de carácter público
  </h3>

  <p class={description}>
    Salvo indicación en contrario, la información contenida en el sitio será considerada de carácter público. Cuando su uso o tratamiento esté sujeto a algún tipo de restricción deberá estarse a lo indicado expresamente en ese caso. Los datos y sus visualizaciones en este sitio son provistos únicamente como información general para los usuarios/as, haciéndose el máximo esfuerzo en materia de relevancia, exactitud y completitud.
  </p>

  <h3 class={subtitle}>
    <span class={pink}>•</span>
    Responsabilidad
  </h3>

  <p class={description}>
    Datysoc no es responsable por las acciones que los usuarios tomen en función de los datos obtenidos a través de esta página.
  </p>

  <h3 class={subtitle}>
    <span class={red}>•</span>
    Licencia
  </h3>

  <p class={description}>
    El contenido de este sitio está bajo una Licencia Creative Commons Atribución 4.0 Internacional y cualquier garantía expresa o implícita será rechazada. En ningún caso Datysoc será responsable por ningún daño directo, indirecto, incidental, especial o de cualquier otra clase que surja de cualquier forma de uso de este software y estos datos, incluso si se ha advertido la posibilidad de que tales daños existan.
  </p>

  <h3 class={subtitle}>
    <span class={green}>•</span>
    Análisis y visualizaciones
  </h3>

  <p class={description}>
    Los análisis y visualizaciones provistos en el sitio son realizados por el equipo de Datysoc brindando toda la información disponible a través del sitio web.
  </p>

  <h3 class={subtitle}>
    <span class={violet}>•</span>
    Servicio gratuito
  </h3>

  <p class={description}>
    La prestación de este servicio tiene carácter gratuito para los usuarios. Los usuarios se obligan a hacer buen uso del sitio web y de sus contenidos, respetando la normativa nacional vigente, las buenas costumbres y el orden público, comprometiéndose en todos los casos a no causar daños al mismo ni a ningún tercero. A tal efecto, el usuario se abstendrá de utilizar cualquiera de los servicios con fines o efectos ilícitos, prohibidos en los presentes Términos y condiciones, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los servicios, documentos y toda clase de contenidos en cualquier equipo informático o de otros usuarios.
  </p>

  <h3 class={subtitle}>
    <span class={orange}>•</span>
    Contenido incrustado de otros sitios web
  </h3>

  <p class={description}>
    El sitio tiene contenido incrustado (por ejemplo, vídeos, imágenes, artículos, etc.) de otras web. Estas pueden recopilar datos, utilizar cookies, incrustar un seguimiento adicional de terceros, y supervisar la interacción con ese contenido incrustado, incluido el seguimiento de su interacción con el contenido incrustado de una cuenta y conexión a esa web.
  </p>
</main>

<Footer />
