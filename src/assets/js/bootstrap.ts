import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'

import { 
  AlertPlugin,
  BadgePlugin,
  ButtonPlugin,
  CardPlugin,
  DropdownPlugin,
  FormCheckboxPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  FormPlugin,
  FormRadioPlugin,
  FormSelectPlugin,
  FormTextareaPlugin,
  ImagePlugin,
  LayoutPlugin,
  ListGroupPlugin,
  ModalPlugin,
  NavbarPlugin,
  PopoverPlugin,
  SpinnerPlugin,
  TabsPlugin,
  ToastPlugin
} from 'bootstrap-vue';

const plugins = [
  AlertPlugin,
  BadgePlugin,
  ButtonPlugin,
  CardPlugin,
  DropdownPlugin,
  FormCheckboxPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  FormPlugin,
  FormRadioPlugin,
  FormSelectPlugin,
  FormTextareaPlugin,
  ImagePlugin,
  LayoutPlugin,
  ListGroupPlugin,
  ModalPlugin,
  NavbarPlugin,
  PopoverPlugin,
  SpinnerPlugin,
  TabsPlugin,
  ToastPlugin
];

for (const plugin of plugins){
  Vue.use(plugin);
}