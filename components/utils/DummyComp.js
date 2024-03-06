import React from 'react'

export default function DummyComp(props) {
    const {
        cart: { checkout: { summary }, items },
        className,
        checkoutButtonText,
        components: { Button, CartCheckoutButton, CartItems, MiniCartSummary },
        footerMessageText,
        onCheckoutButtonClick,
        ...props
      } = props;


      let selectOptions = () => (
        <Select>
            <Option>Option1</Option>
            <Option>Option1</Option>
            <Option>Option1</Option>
            <Option>Option1</Option>
        </Select>
      )

      const [anchorElement, setAnchorElement] = React.useState(null)

      const clickhandler = (element) => {
        setAnchorElement(element)
      }
  return (
    <div>
      
    </div>
  )
}
