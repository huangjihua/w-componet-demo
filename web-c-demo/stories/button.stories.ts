import { html, TemplateResult } from 'lit-html';
import '../src/ah-button.js';

export default {
  title: 'ah-button',
  component: 'ah-button',
  argTypes: {
    title: { control: 'text' },
    icon: {
      control: {
        type: 'radio', options: ['heart', 'search', 'link', 'left']
      }
    },
    type: {
      control: {
      type:'radio', options:['primary','dashed','flat','dashed']
    } },
    shape: {
      control: {
         type:'select', options:['circle']
      }
    },
    buttonBgColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  icon?: string;
  title?: string;
  type?: string;
  shape?: string;
  buttonBgColor?: string;
  slot?: TemplateResult;
}



const Template: Story<ArgTypes> = ({
  title = '按钮',
  icon ='',
  type = 'primary',
  // shape = "circle",
  buttonBgColor,
  slot,
}: ArgTypes) => html`
  <ah-button
    style="--themeBackground: ${buttonBgColor || '#05f'}"
    type=${type}
    icon=${icon}
  >
  ${slot}
  ${title}
  </ah-button>
`;

export const Regular = Template.bind({});

export const CustomType = Template.bind({});
CustomType.args = {
  type: 'primary',
};

export const CustomShape = Template.bind({});
CustomShape.args = {
  shape: 'circle',
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
