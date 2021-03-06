# Grace Shopper Tiers

## Tier 1: MVP Shopping Experience

### As a customer/visitor, I want to be able to:
[x] access a deployed version of the website so I can browse and purchase products.
[x] view all available products so I can pick from a variety.
[x] view a single product so I can see more details.
[] add a product to my cart so I can collect my desired products in one place.
[x] edit my cart if I change my mind:
  [x] change the quantity of a product in my cart.
  [x] remove a product in my cart.
  [x] *No one else should be able to edit my cart except me.*
[x] "checkout" the items in my cart so I can purchase my desired goods.
  [x] *Think of a typical user experience on popular websites from a guest user and logged-in user perspective.*
  [x] *You can just start with by simulating the experience of checking out with a simple confirmation page.*
[x] create an account so I can have a logged-in experience.

### As a logged-in customer, I want to be able to:
[x] have a persistent cart so I can revisit and pick up where I left off.
  [x] *Logged-in-user across multiple devices: I'm logged in on my mobile device and add some items to my cart. When I open the browser on my laptop and log in, I want to see those items in my cart.*
  [x] *No one else should be able to edit my cart except me.*

### As an administrator, I want to be able to:
[x] have validated data to ensure reliability.
  [x] *i.e. each customer that creates an account should only be able to do so once with a single email address.*
[x] have full rights to make backend requests to add, edit, and remove products.
  [x] *No one else should have access.*
[x] view user information.
  [x] *No one else should have access.*

### As an engineer, I want to:
[x] have a well-seeded database so that I am able to simulate a number of different scenarios for the user stories below.
  [x] *By doing this, you really set yourselves up to tackle many of the points throughout the tiers. In the long run, this will save you, potentially, tons of time.*
  [x] *For example, seed hundreds of products with dummy data so that when you get to the ???pagination??? user story, you won???t have to worry about adding more products.*
  [x] *Likewise, add a bunch of users with products in their carts so editing the cart can be worked on without already having the ???add to cart??? functionality built out.*
[x] user data to be secure so that no one can unrightfully manipulate information.