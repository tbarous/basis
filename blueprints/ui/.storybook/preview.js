import { addDecorator } from "@storybook/react";
import { withThemesProvider } from "storybook-addon-styled-component-theme";
import { ThemeProvider } from "styled-components";
import Compact from '../src/themes/compact/Theme';
import Material from '../src/themes/material/Theme';

const themes = [Compact, Material];
addDecorator(withThemesProvider(themes), ThemeProvider);