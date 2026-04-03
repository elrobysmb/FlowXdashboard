import type { ComputedRef, MaybeRef } from 'vue'

type ComponentProps<T> = T extends new(...args: any) => { $props: infer P } ? NonNullable<P>
  : T extends (props: infer P, ...args: any) => any ? P
  : {}

declare module 'nuxt/app' {
  interface NuxtLayouts {
    commercial: ComponentProps<typeof import("/home/roby/flowxdashboardv3 1-4-25/flowxdashboardv3/layouts/commercial.vue").default>,
    default: ComponentProps<typeof import("/home/roby/flowxdashboardv3 1-4-25/flowxdashboardv3/layouts/default.vue").default>,
    grijalva: ComponentProps<typeof import("/home/roby/flowxdashboardv3 1-4-25/flowxdashboardv3/layouts/grijalva.vue").default>,
}
  export type LayoutKey = keyof NuxtLayouts extends never ? string : keyof NuxtLayouts
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}