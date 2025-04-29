Feature: Ecommerce validations
@Validations
@tag2
Scenario: Placing the Order
Given a login to Ecommerce application with "sssmeena207@gmail.com" and "Testing@123"
When Add "IPHONE 13 PRO" to Cart
Then verify "IPHONE 13 PRO" is displayed in cart
When Enter Valid Details and Place the Order
Then verify order is present in OrdersHistory Page



@outline
Scenario Outline:  Placing the Order
Given a login to Ecommerce application with "<username>" and "<password>"
When Add "IPHONE 13 PRO" to Cart
Then verify "IPHONE 13 PRO" is displayed in cart
When Enter Valid Details and Place the Order
Then verify order is present in OrdersHistory Page



Examples: 

| username | password |
| sssmeena207@gmail.com | Testing@123 |
| invalid | test123 |