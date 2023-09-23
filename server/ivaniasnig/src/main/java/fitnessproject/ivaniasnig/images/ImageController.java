package fitnessproject.ivaniasnig.images;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping
    public ResponseEntity<Image> uploadImage(@RequestParam("file") MultipartFile file,  @RequestParam UUID id) {
        try {
            Image image = imageService.saveImage(file , id);
            return new ResponseEntity<>(image, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<byte[]> getImage(@PathVariable UUID id) {
//        Image image = imageService.getImage(id);
//        if (image != null) {
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + image.getName() + "\"")
//                    .body(image.getData());
//        }
//        return ResponseEntity.status(404).body(null);
//    }
}
