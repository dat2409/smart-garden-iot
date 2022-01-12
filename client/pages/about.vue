<template>
  <div class="about-us">
    <div class="contain">
      <v-parallax :src="require('~/assets/images/about-us-title-img-1.jpg')">
      </v-parallax>

      <div class="text-image-header display-1 white--text">
        <p class="text-image-header-satisfy text-center text-capitalize">
          welcome
        </p>
        <p class="font-weight-bold display-2 text-capitalize">about us</p>
      </div>
    </div>
    <v-container class="mt-16">
      <v-row class="py-16">
        <v-col cols="12" md="7">
          <v-card outlined class="transparent">
            <v-card-title class="display-2 font-weight-bold">Our Popular Tours</v-card-title>
            <v-card-subtitle class="title mt-1 mb-4"
              >Si elit omnes impedit ius, vel et hinc agam fabulas. Ut audiam
              invenire iracundia vim. Tn eam dimo diam ea. Piber Korem sit
              amet.</v-card-subtitle
            >
            <v-card-text
              >Al elit omnes impedit ius, vel et hinc agam fabulas. Ut audiam
              invenire iracundia vim. En eam dico similique, ut sint posse sit,
              eum sumo diam ea. Liber consectetuer in mei, sea in imperdiet
              assue verit contentio nes, an his cibo blandit tacimates. Iusto
              iudi cabit sim ilique id velex, in sea rebum deseruisse
              appellantur. Etiam rhoncus. Maec enas tempus, tellus eget
              condimentum rhoncus.Aliquam lorem ante, dapibus in, viverra quis,
              feugiat</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="5" align="end">
          <v-avatar size=350>
            <v-img :src="require('~/assets/images/hoa-sen-about-us.jpg')"></v-img>
          </v-avatar>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
