export const YoungOSSImageDefaultProcess = {
  /**
   * 官方文档 https://help.aliyun.com/zh/oss/user-guide/img-parameters/?spm=a2c4g.11186623.0.0.533b1210VUHgHP
   */
  "aliyun": "x-oss-process=image/format,webp/quality,Q_75",
  /**
   * 官方文档 https://developer.qiniu.com/dora/1279/basic-processing-images-imageview2
   */
  "qiniu": "imageView2/0/format/webp/q/75",
  /**
   * 官方文档 https://cloud.tencent.com/document/product/436/44883
   */
  "tencent": "imageMogr2/format/webp/lquality/75",
  /**
   * 官方文档 https://cloud.baidu.com/doc/BOS/s/dldh5wp4s
   * @description 自适应 webp，据文档所说挺厉害的
   */
  "baidu": "x-bce-process=image/format,f_auto/quality,Q_75",
  /**
   * 官方文档 https://sf.163.com/help/documents/114078550521466880
   */
  "163yun": "imageView&type=webp&quality=75",
  /**
   * 官方文档 https://support.huaweicloud.com/fg-obs/obs_01_0471.html
   */
  "huawei": "x-image-process=image/format,webp/quality,Q_75"
};
