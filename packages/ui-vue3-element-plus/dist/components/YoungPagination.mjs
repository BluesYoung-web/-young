import { useMediaQuery } from "@vueuse/core";
import { ElPagination } from "element-plus";
import { defineComponent } from "vue";
const RequiredNumber = {
  type: Number,
  required: true
};
export default defineComponent({
  props: {
    total: RequiredNumber,
    page: RequiredNumber,
    limit: RequiredNumber,
    pageSizes: {
      type: Object,
      default: () => [10, 20, 30, 50]
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  emits: ["page-change", "update:page", "update:limit"],
  setup(props, { emit, attrs }) {
    const sizeChange = (val) => {
      emit("update:page", 1);
      emit("update:limit", val);
      emit("page-change");
    };
    const pageChange = (val) => {
      emit("update:page", val);
      emit("page-change");
    };
    const ltSm = useMediaQuery("(max-width: 639.9px)");
    return () => props.total > 0 && /* @__PURE__ */ React.createElement(
      ElPagination,
      {
        style: { background: "white", paddingTop: "20px", display: "flex", flexWrap: "wrap" },
        ...attrs,
        background: props.background,
        currentPage: props.page,
        pageSize: props.limit,
        layout: ltSm.value ? "total, sizes, jumper" : props.layout,
        pageSizes: props.pageSizes,
        total: props.total,
        "onUpdate:page-size": (v) => sizeChange(v),
        "onUpdate:current-page": (v) => pageChange(v)
      }
    );
  }
});
