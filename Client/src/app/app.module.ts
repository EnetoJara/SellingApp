import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { AddressComponent } from './components/address/address.component'
import { CartComponent } from './components/cart/cart.component'
import { CategoriesComponent } from './components/categories/categories.component'
import { CategoryComponent } from './components/category/category.component'
import { LoginComponent } from './components/login/login.component'
import { MessageComponent } from './components/message/message.component'
import { MyProductsComponent } from './components/my-products/my-products.component'
import { PostProductsComponent } from './components/post-products/post-products.component'
import { ProductComponent } from './components/product/product.component'
import { ProfileComponent } from './components/profile/profile.component'
import { RegistrationComponent } from './components/registration/registration.component'
import { SearchComponent } from './components/search/search.component'
import { SettingsComponent } from './components/settings/settings.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'


@NgModule({
	declarations: [
		AppComponent, HomeComponent, AddressComponent, CartComponent,
		CategoriesComponent, CategoryComponent, LoginComponent,
		MessageComponent, MyProductsComponent, PostProductsComponent,
		ProductComponent, ProfileComponent, RegistrationComponent,
		SearchComponent, SettingsComponent, PageNotFoundComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
