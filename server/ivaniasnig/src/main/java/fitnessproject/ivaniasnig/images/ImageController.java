package fitnessproject.ivaniasnig.images;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    public ResponseEntity<Image> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam UUID id,
            @RequestParam String description,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {

        try {
            if (date == null) {
                date = LocalDate.now(); 
            }
            Image image = imageService.saveImage(file, id, description, date);
            return new ResponseEntity<>(image, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @DeleteMapping("/{id}")
    public String deleteImage(@PathVariable UUID id) {
    	imageService.deleteImages(id);
    	return "Deleted image with id: " + id;
    }
}
