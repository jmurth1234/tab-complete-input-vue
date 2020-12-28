// Import the mount() method from the test utils
// and the component you want to test
import { mount } from "@vue/test-utils";
import Input from "../tab-complete-input";

describe("Vue Tab Complete Input: ", () => {
  it("has an input", () => {
    const wrapper = mount(Input);
    expect(wrapper.find("input").exists()).toBe(true);
  });

  it("should accept an array of names and populate a trie", () => {
    const wrapper = mount(Input, {
      props: {
        dataSource: ["John", "Jake"]
      }
    });

    expect(wrapper.vm.trie.contains("Jake")).toBe(true);
  });

  it("should successfully tab complete a static array", async () => {
    const wrapper = mount({
      components: {
        Input
      },
      template: `<Input ref="input" v-model="text" :data-source="list" />`,
      data() {
        return {
          list: ["John", "Jake"],
          text: "J"
        };
      }
    });
    const input = wrapper.find("input");

    input.setValue("J");

    const child: any = wrapper.findComponent(Input).vm;
    child.selectRange(1, 1);

    input.trigger("keydown", {
      keyCode: 9
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.text).toBe("Jake");
  });

  it("should successfully tab complete a promise", async done => {
    const wrapper = mount({
      components: {
        Input
      },
      template: `<Input ref="input" v-model="text" :data-source="list" @selection-changed="onTabSuccess" />`,
      data() {
        return {
          text: "J"
        };
      },
      methods: {
        async list() {
          return await new Promise(resolve => {
            setTimeout(() => {
              resolve(["John", "Jake"]);
            }, 200);
          });
        },
        onTabSuccess() {
          expect(wrapper.vm.text).toBe("Jake");
          done();
        }
      }
    });
    const input = wrapper.find("input");

    input.setValue("J");

    const child = wrapper.findComponent(Input);
    (child.vm as any).selectRange(1, 1);

    input.trigger("keydown", {
      keyCode: 9
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.text).not.toBe("Jake");
  });
});
