<template>
    <div>
        <div id="container"></div>
        <div>
            {{ clickLocation }}
        </div>
        <div>{{ addressInfo }}</div>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';

window._AMapSecurityConfig = {
    securityJsCode: "4e2d9ed834ae59963fdef04be80208d2"
}

export default {
    name: "lyhMap",
    data() {
        return {
            lat_long: [],
            clickLocation: "",
            addressInfo: "",
        }
    },
    mounted() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                console.log(this.lat_long)
                this.lat_long = [position.coords.longitude, position.coords.latitude]
                this.initMap()
                console.log(this.lat_long)
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }


    },
    methods: {
        initMap() {
            console.log(this.lat_long, '1')
            AMapLoader.load({
                key: "4f11dd9d9b527f18ff734c7066ef8b11",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.Scale', 'AMap.Geocoder', 'AMap.complete'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                this.map = new AMap.Map("container", {  //设置地图容器id
                    viewMode: "2d",    //是否为3D地图模式
                    zoom: 15,           //初始化地图级别
                    center: this.lat_long, //初始化地图中心点位置
                });
                this.geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: 'all'
                });


                this.map.on('click', this.handleMapClick)
            }).catch(e => {
                console.log(e);
            })

        },
        getAddress(lnglatXY) {
            this.geocoder.getAddress(lnglatXY, (status, result) => {
                if (status === 'complete' && result.regeocode) {
                    console.log(result.regeocode.formattedAddress);
                    this.addressInfo = result.regeocode.formattedAddress
                } else {
                    console.log('Geocoder failed due to: ' + status);
                }
            });
        },

        handleMapClick(e) {
            console.log(e, 'eee')
            this.clickLocation = '您在 [ ' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + ' ] 的位置单击了地图！'
            this.getAddress([e.lnglat.getLng(), e.lnglat.getLat()])
        },
    },
}
</script>

<style scoped>
#container {
    width: 800px;
    height: 600px;
}
</style>