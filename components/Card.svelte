<script>
import { link } from "svelte-spa-router";
export let title, description, image, publishDate;
</script>

<div class="wrapper">
  <a href={image} target="_blank">
    <img src={image} alt="img" >
  </a>
    <div>
        <h2 class="title"><a href={`/article/${title}`} use:link>{title}</a></h2>
        <p class="description">{description.substring(0, 180)}...</p>
        <p>Published: {publishDate}</p>
    </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 20px;
    padding: 20px 0;
  }

  .title,
  .description {
    margin: 0 0 10px 0;
  }

  img {
    border-radius: 5px;
    max-width: 230px;
    cursor: pointer;
  }

  @media only screen and (max-width: 600px) {
    .wrapper {
      grid-template-columns: 1fr;
    }

    img {
      max-width: 100%;
    }
  }
</style>