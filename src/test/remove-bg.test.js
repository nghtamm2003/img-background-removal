import { Builder, By, until } from "selenium-webdriver";
import edge from "selenium-webdriver/edge.js";
import path from "path";
import { expect } from "chai";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = new edge.Options();
options.addArguments("--allow-file-access-from-files");
options.addArguments("--disable-web-security");

// Hàm sleep
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Kiểm thử chức năng xóa nền ảnh", function () {
    // Mỗi test case sẽ có 30 giây để hoàn thành
    this.timeout(30000);

    let driver;

    before(async () => {
        const service = new edge.ServiceBuilder(path.resolve(__dirname, "./driver/msedgedriver.exe"));
        driver = await new Builder().forBrowser("MicrosoftEdge").setEdgeService(service).setEdgeOptions(options).build();
        await driver.get(`file:///${path.resolve(__dirname, "../views/remove-bg.html")}`);
    });

    after(async () => {
        console.log("Kiểm thử thành công!");
    });

    afterEach(async () => {
        // Sleep 5 giây giữa mỗi test case
        await sleep(5000);

        // Refresh trang sau mỗi test case
        await driver.navigate().refresh();
    });

    it("Happy Case: Xóa nền ảnh thành công", async () => {
        const filePath = path.resolve(__dirname, "../test/data/capybara.jpg");

        const fileInput = await driver.findElement(By.css("input[type='file']"));
        await driver.executeScript("arguments[0].style.display = 'block';", fileInput);
        await fileInput.sendKeys(filePath);

        await driver.wait(until.elementLocated(By.css("img.upload-img")), 5000);
        const uploadedImage = await driver.findElement(By.css("img.upload-img"));
        expect(await uploadedImage.isDisplayed()).to.be.true;

        const removeButton = await driver.findElement(By.css("button.remove-button"));
        await removeButton.click();

        await driver.wait(until.elementLocated(By.css("button.download-button:not(.hidden)")), 20000);
        const downloadButton = await driver.findElement(By.css("button.download-button"));
        expect(await downloadButton.isDisplayed()).to.be.true;
    });

    // Negative Case 1: Upload tệp không phải là hình ảnh
    it("Negative Case 1: Upload tệp không phải là hình ảnh", async () => {
        const invalidFilePath = path.resolve(__dirname, "../test/data/Nguyễn Hoàng Tâm - Mobile Developer Intern.pdf");

        const fileInput = await driver.findElement(By.css("input[type='file']"));
        await driver.executeScript("arguments[0].style.display = 'block';", fileInput);
        await fileInput.sendKeys(invalidFilePath);

        try {
            await driver.wait(until.alertIsPresent(), 5000); // Chờ alert
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            expect(alertText).to.include("Tập tin upload phải là hình ảnh!");
            await alert.accept();
        } catch (err) {
            console.error("Lỗi:", err);
        }
    });

    // Negative Case 2: Xóa nền ảnh mà không upload ảnh
    it("Negative Case 2: Xóa nền ảnh mà không upload ảnh", async () => {
        const removeButton = await driver.findElement(By.css("button.remove-button"));
        await removeButton.click();

        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        expect(alertText).to.include("Vui lòng upload ảnh trước khi thực hiện xóa nền!");
        await alert.accept();
    });

    // Negative Case 3: Kết nối API bị lỗi
    it("Negative Case 3: Kết nối API bị lỗi", async () => {
        // Mock một request 'fetch' để giả lập lỗi API
        await driver.executeScript(`
            window.fetch = function() {
                return Promise.reject(new Error("API connection failed"));
            };
        `);

        const filePath = path.resolve(__dirname, "../test/data/capybara.jpg");
        const fileInput = await driver.findElement(By.css("input[type='file']"));
        await driver.executeScript("arguments[0].style.display = 'block';", fileInput);
        await fileInput.sendKeys(filePath);

        const removeButton = await driver.findElement(By.css("button.remove-button"));
        await removeButton.click();

        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        expect(alertText).to.include("Kết nối API thất bại!");
        await alert.accept();
    });

    // Negative Case 4: API trả về kết quả rỗng
    it("Negative Case 4: API trả về kết quả rỗng", async () => {
        // Mock một request 'fetch' để giả lập API trả về kết quả rỗng
        await driver.executeScript(`
            window.fetch = function() {
                return Promise.resolve(new Response(null, { status: 200 }));
            };
        `);

        const filePath = path.resolve(__dirname, "../test/data/capybara.jpg");
        const fileInput = await driver.findElement(By.css("input[type='file']"));
        await driver.executeScript("arguments[0].style.display = 'block';", fileInput);
        await fileInput.sendKeys(filePath);

        const removeButton = await driver.findElement(By.css("button.remove-button"));
        await removeButton.click();

        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        expect(alertText).to.include("Không nhận được kết quả từ server!");
        await alert.accept();
    });
});
