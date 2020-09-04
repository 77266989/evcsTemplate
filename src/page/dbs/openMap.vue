<template>
    <div class="main flex flexc">
        <el-amap style="width:100%; height:420px" vid="amap-vue1" :events="mapEvents"  :zoom="12"   :center="center">
                 <el-amap-marker :position="marker.position"
                          :events="marker.events"
                          :visible="marker.visible"
                          :draggable="marker.draggable"></el-amap-marker>
        </el-amap>
        <el-col :span="24" style="text-align: right; margin:15px 0">
            <el-button  @click="dialog.close()">取消</el-button>
            <el-button type="primary"   @click="submit">确定</el-button>
        </el-col>
    </div>
    
</template>

<script>
    export default {
        mounted () {
            if(!this.isEmpty(this.$parent.$parent.params.latitude)){
                this.open(this.$parent.$parent.params.latitude,this.$parent.$parent.params.longitude);
            }
            
        },
        data () {
            return {
                center: [119.317225,26.070985],
                marker: {
                    position: [119.317225,26.070985],
                    visible: true,
                    draggable: false
                },
                mapEvents: {
                    init(o) {
                        o.setMapStyle("amap://styles/blue");
                    // o.setMapStyle("amap://styles/22175cb1222cc35dec20d2887d0bf772"); 自定义地图样式
                    },
                    click: (e) => {
                        this.marker.position = [e.lnglat.lng, e.lnglat.lat]
                        this.center = [e.lnglat.lng, e.lnglat.lat]
                    }

                }
            };
        },
        methods:{
          open (lng, lat) {
                if (lng && lat) {
                this.center = [lng, lat]
                this.marker.position = [lng, lat]
                }
            },
            submit () {
                this.dialog.submit(this.marker.position);
            },
      
           
        }

    };
</script>
