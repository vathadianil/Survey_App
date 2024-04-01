export const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
  </head>
  <style>
    .container {
      display: flex;
      justify-content: center;
    }
    .btn {
      padding: 0.5em 1.5em;
      background-color: #1871de;
      color: #fff;
      border: none;
      outline: none;
      display: flex;
      align-items: center;
      border-radius: 0.2em;
      justify-content: center;
      font-size: 16px;
    }
    .btn:disabled,
    .btn[disabled] {
      border: 1px solid #999999;
      background-color: #cccccc;
      color: #666666;
      cursor: not-allowed;
    }
  </style>
  <body>
    <div class="container">
      <button type="button" id="renderBtn" class="btn">Pay Now</button>
    </div>
  </body>
  <script>
    
      
    const cashfree = Cashfree({
      mode: "sandbox", //or production,
    });
    document.getElementById("renderBtn").disabled = true;
    document.getElementById("renderBtn").addEventListener("click", () => {
      window.ReactNativeWebView.postMessage('paymentBtnClicked')
      cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_self",
      });
    });
  </script>
</html>
`;
