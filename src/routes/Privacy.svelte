<script>
  const privacyContent = {
    title: "Permisos de uso y privacidad",

    sections: [
      {
        id: 'fuenteDatos',
        subtitle: "Fuente de los datos",
        color: "insuficiente",
        description: "Los datos utilizados en este sitio son provistos por diversas fuentes que a continuación se detallan: Informe de la situación de las flexibilidades del derecho de autor en América Latina, vídeos, podcasts, análisis y visualizaciones generados por el equipo de Datysoc y Fundación Karisma.",
      },

      {
        id: 'infoPublica',
        subtitle: "Información de carácter público",
        color: "mainLink",
        description: "Salvo indicación en contrario, la información contenida en el sitio será considerada de carácter público. Cuando su uso o tratamiento esté sujeto a algún tipo de restricción deberá estarse a lo indicado expresamente en ese caso. Los datos y sus visualizaciones en este sitio son provistos únicamente como información general para los usuariosas, haciéndose el máximo esfuerzo en materia de relevancia, exactitud y completitud.",
      },

      {
        id: "responsabilidad",
        subtitle: "Responsabilidad",
        color: "notice",
        description: "Datysoc no es responsable por las acciones que los usuarios tomen en función de los datos obtenidos a través de esta página.",
      },

      {
        id: "licencia",
        subtitle: "Licencia",
        color: "error",
        description: "El contenido de este sitio está bajo una Licencia Creative Commons Atribución 4.0 Internacional y cualquier garantía expresa o implícita será rechazada. En ningún caso Datysoc será responsable por ningún daño directo, indirecto, incidental, especial o de cualquier otra clase que surja de cualquier forma de uso de este software y estos datos, incluso si se ha advertido la posibilidad de que tales daños existan.",
      },

      {
        id: 'analisisViz',
        subtitle: "Análisis y visualizaciones",
        color: "success",
        description: "Los análisis y visualizaciones provistos en el sitio son realizados por el equipo de Datysoc brindando toda la información disponible a través del sitio web.",
      },

      {
        id: 'servicioGratuito',
        subtitle: "Servicio gratuito",
        color: "violet",
        description: "La prestación de este servicio tiene carácter gratuito para los usuarios. Los usuarios se obligan a hacer buen uso del sitio web y de sus contenidos, respetando la normativa nacional vigente, las buenas costumbres y el orden público, comprometiéndose en todos los casos a no causar daños al mismo ni a ningún tercero. A tal efecto, el usuario se abstendrá de utilizar cualquiera de los servicios con fines o efectos ilícitos, prohibidos en los presentes Términos y condiciones, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los servicios, documentos y toda clase de contenidos en cualquier equipo informático o de otros usuarios.",
      },

      {
        id: 'contenidoIncrustado',
        subtitle: "Contenido incrustado de otros sitios web",
        color: "highlight",
        description: "El sitio tiene contenido incrustado (por ejemplo, vídeos, imágenes, artículos, etc.) de otras web. Estas pueden recopilar datos, utilizar cookies, incrustar un seguimiento adicional de terceros, y supervisar la interacción con ese contenido incrustado, incluido el seguimiento de su interacción con el contenido incrustado de una cuenta y conexión a esa web."
      },
    ],
  };
</script>

<div class="mt-2 mb-4 md:mb-8 lg:mt-4 lg:mb-12">
  <h2 class="text-center text-base font-bold mt-2 mb-4 md:text-lg md:mb-6 lg:text-2xl lg:mt-4 lg:mb-6">
    <span class="border-b-2 border-b-highlight pb-1 md:px-8">
      {privacyContent.title}
    </span>
  </h2>

  {#each privacyContent.sections as section (section.id)}
    <div class="text-left my-2 md:max-w-xl lg:max-w-2xl my mx-auto">
      <h3 class="py-1 text-sm md:text-base lg:text-lg">
        <span class={`text-${section.color}`}>•</span>
        {section.subtitle}
      </h3>

      <p class="px-4 text-left font-body text-xs text-inactive md:text-sm lg:text-base">
        {section.description}
      </p>
    </div>
  {/each}
</div>
