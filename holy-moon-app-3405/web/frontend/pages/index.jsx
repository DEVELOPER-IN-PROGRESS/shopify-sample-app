import { useNavigate, TitleBar, Loading , ResourcePicker  } from "@shopify/app-bridge-react";
//import { getSessionToken } from "@shopify/app-bridge-utils";
// import { Shopify } from "@shopify/shopify-api";
import { QRCodeIndex } from "../components";
import { useAppQuery } from "../hooks";
 import {
  Card,
  EmptyState,
  Layout,
  Page,
  SkeletonBodyText,
} from "@shopify/polaris";
import { useEffect, useState } from "react";



const {  API_KEY , API_SECRET_KEY} = process.env ;

export default function HomePage() {

let [link, setLink] = useState('');

useEffect(() => {
  link = window.location.href.match(/host=.{1,}\&l/g);
  link = link[0]?.substring(5,link[0].length -2)
  setLink(link);
 console.log("useeffect")
//   const fetchSession = async () => {
//     const session = await Shopify.Utils.loadCurrentSession(req, res);
//     console.log(session) ;
//   }
//  fetchSession().catch( err => console.log(err + 'Things just got out of hand '))
}, []);


function tryy(){
  // const permissionUrl = `https://${link}/admin/oauth/authorize?client_id=a1c5e0379b261bf1e83b68bee09baf1c&scope=read_products,read_content&redirect_uri=https://www.google.com`;


  // if (isShopifyEmbedded()) {
  //   const app = createApp({
  //     apiKey: "a1c5e0379b261bf1e83b68bee09baf1c",
  //     host : link
  //   });
     console.log('e se  block')
  //   Redirect.create(app).dispatch(Redirect.Action.REMOTE, permissionUrl);
  // }else {
  //   console.log('else block')
  //   window.location.assign(permissionUrl);
  // }

  const app = createApp({
        apiKey: "a1c5e0379b261bf1e83b68bee09baf1c",
        host : link
      });

  app.dispatch(
    Redirect.toRemote({
      url: 'https://www.google.com'
    })
  );

}


  /*
    Add an App Bridge useNavigate hook to set up the navigate function.
    This function modifies the top-level browser URL so that you can
    navigate within the embedded app and keep the browser in sync on reload.
  */
  const navigate = useNavigate();

  /*
    These are mock values. Setting these values lets you preview the loading markup and the empty state.
  */
//   const isLoading = false;
//   const isRefetching = false;
//   const QRCodes = [
//   	{
//     	createdAt: "2022-06-13",
//     	destination: "checkout",
//     	title: "My first QR code",
//     	id: 1,
//     	discountCode: "SUMMERDISCOUNT",
//     	product: {
//       	title: "Faded t-shirt",
//     	}
//   	},
//   	{
//     	createdAt: "2022-06-13",
//     	destination: "product",
//     	title: "My second QR code",
//     	id: 2,
//     	discountCode: "WINTERDISCOUNT",
//     	product: {
//       	title: "Cozy parka",
//     	}
//   	},
//   	{
//     	createdAt: "2022-06-13",
//     	destination: "product",
//     	title: "QR code for deleted product",
//     	id: 3,
//     	product: {
//       	title: "Deleted product",
//     	}
//   	},
// ];

/* useAppQuery wraps react-query and the App Bridge authenticatedFetch function */
const {
  data: QRCodes,
  isLoading,

  /*
    react-query provides stale-while-revalidate caching.
    By passing isRefetching to Index Tables we can show stale data and a loading state.
    Once the query refetches, IndexTable updates and the loading state is removed.
    This ensures a performant UX.
  */
  isRefetching,
} = useAppQuery({
  url: "/api/qrcodes",
});


  /* Set the QR codes to use in the list */
const qrCodesMarkup = QRCodes?.length ? (
  <QRCodeIndex QRCodes={QRCodes} loading={isRefetching} />
) : null;

  /* loadingMarkup uses the loading component from AppBridge and components from Polaris  */
  const loadingMarkup = isLoading ? (
    <Card sectioned>
      <Loading />
      <SkeletonBodyText />
    </Card>
  ) : null;

  /* Use Polaris Card and EmptyState components to define the contents of the empty state */
  const emptyStateMarkup =
    !isLoading && !QRCodes?.length ? (
      <Card sectioned>
        <EmptyState
          heading="Create unique QR codes for your product"
          /* This button will take the user to a Create a QR code page */
          action={{
            content: "Create QR code",
            onAction: () => navigate("/qrcodes/new"),
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>
            Allow customers to scan codes and buy products using their phones.
          </p>
        </EmptyState>
      </Card>
    ) : null;

  /*
    Use Polaris Page and TitleBar components to create the page layout,
    and include the empty state contents set above.
  */
 const [modal , setModal ] = useState({open :false})

 const config = {apiKey: 'a1c5e0379b261bf1e83b68bee09baf1c', host: link };

 async function onload(){
  // console.log("sei qui ");
  // const session = await Shopify.Utils.loadCurrentSession(
  //   req,
  //   res
  // );
  // const client = new Shopify.Clients.Graphql(
  //   session.shop,
  //   session.accessToken
  // );

  // const query = `
  // query{
  //   products(first:3){
  //    edges{
  //      nodes {
  //        id
  //      }
  //    }
  //  }
  //  }` ;
  // const response = await client.query({data: `${query}`});
  //   return response;

  // const sessionToken = await getSessionToken(app);
  // const data = sessionToken
  //               .then(res => res.json())
  //               .then( data => console.log(data)) ;
 }

  return (
    <Page>
      <TitleBar
        title="QR codes"
        primaryAction={{
          content: "Create QR code",
          onAction: () => navigate("/qrcodes/new"),
        }}
      />
      <ResourcePicker
       resourceType="product"
       showVariants={false}
        open = {modal.open}
        onCancel ={() => setModal({open :true})}
      />
      <Layout>
        <Layout.Section>
          {loadingMarkup}
          {qrCodesMarkup}
          {emptyStateMarkup}
          {/* { onload() } */}
          { link}
          {  API_KEY }
          {/* { tryy() } */}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
