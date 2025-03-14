import DefaultLayout from './DefaultLayout.vue'
import type { Component } from 'vue'

type Layouts = Record<string, Component>

const layouts: Layouts = {
  DefaultLayout,
}
export default layouts
