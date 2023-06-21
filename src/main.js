import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

web.listen(3010, () => {
    logger.info("Server app start ...")
})