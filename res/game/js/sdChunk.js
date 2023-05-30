
/* global main, THREE */

class Chunk{
	get mesh(){throw new Error();}
	set mesh( v ){throw new Error();}
	constructor( xx, yy, zz, mesh ){
		this.xx = xx;this.yy = yy;this.zz = zz;
		this.bit_mesh = null;this.bitmap = null;
		this.nearby = [];
		this.rgba = null; // Color, opacity
		this.uvs2 = null; // Brightness and invisibility due to being hidden (invisibility is deprecated)
		this.update_needed = true;
		this.recalc_brightness_current_update_hash = []; // Another huge array. Keeps main.recalc_brightness_hash whenever update happens. Depending on their value brightness will be or won't be recalculated (prevention of pointless brightness recalcs).
		this.visible_timer = 0; // Timer that should be set to certain value after which retrace will be needed
		this.dots_total = 0; // Only used to not render empty chunks
	}
	remove(){main.DestroyMovieClip( this.bit_mesh );this.bitmap = null;}
	
	Connect( c ){
		if ( c === null ) throw new Error();
		if ( this.nearby.indexOf( c ) !== -1 ) throw new Error();
		if ( c === this ) throw new Error();
	
		if ( Math.abs( this.xx - c.xx ) > 1 ) throw new Error();
		if ( Math.abs( this.yy - c.yy ) > 1 ) throw new Error();
		if ( Math.abs( this.zz - c.zz ) > 1 ) throw new Error();
	
		if ( ( this.xx === c.xx && this.yy === c.yy ) || ( this.xx === c.xx && this.zz === c.zz ) || ( this.yy === c.yy && this.zz === c.zz ) ) { }
		else throw new Error();
	
		this.nearby.push( c );
		c.nearby.push( this ); }
	UpdateChunk( upd_vertices=false, upd_rgba=true, upd_brightness_visibility=true ){
		if ( upd_rgba || upd_brightness_visibility ) this.update_needed = true; }
	GenerateLODModels( upd_vertices=true, upd_rgba=true, upd_brightness_visibility=true ){ this.ChoseLODMesh(); }
	ChoseLODMesh() // Logic method
	{
		if ( this.update_needed ) {
			this.update_needed = false;
			var chunk_size = main.chunk_size;
			
			if ( this.bitmap === null ) {
				this.bitmap = new BitmapData( main.chunk_size * main.chunk_size, main.chunk_size * 4, true );
				this.bitmap._WakeUpPixelDataArray( false, false );
				
				var sub_geom = new THREE.BufferGeometry();
				
				var vertices = sub_geom.initVertexData( false, ( 4 * main.chunk_size * 3 ) * 3 * 2 );
				var uvs = sub_geom.initUVData( false, ( 4 * main.chunk_size * 3 ) * 2 * 2 );
				var indices = sub_geom.initIndexData( false, ( 6 * main.chunk_size * 3 ) * 2 );
				
				var vert = 0;var ind = 0;var uv = 0;
				
				var uv_scale_x = 1 / ( chunk_size ); // 1024 / 32 = 32
				var uv_scale_y = 1 / ( 4 ); // 96 / 3 = 32
				
				const micro_border_offset_0 = 0;  const micro_border_offset_1 = 1 - 0.000065; 
				
				for ( var side = 0; side <= 1; side++ ) {
					for ( var x = chunk_size - 1; x >= 0; x-- ) {
						var uv_x = x / chunk_size; var uv_y = uv_scale_y * 3;
						if ( side === 0 ) {
							indices[ ind++ ] = vert / 3;indices[ ind++ ] = vert / 3 + 1;indices[ ind++ ] = vert / 3 + 2;
							indices[ ind++ ] = vert / 3 + 2; indices[ ind++ ] = vert / 3 + 3; indices[ ind++ ] = vert / 3;}
						else{
							indices[ ind++ ] = vert / 3; indices[ ind++ ] = vert / 3 + 2; indices[ ind++ ] = vert / 3 + 1;
							indices[ ind++ ] = vert / 3 + 3; indices[ ind++ ] = vert / 3 + 2; indices[ ind++ ] = vert / 3;}

						vertices[ vert++ ] = 0;vertices[ vert++ ] = 0;vertices[ vert++ ] = x + side;
						vertices[ vert++ ] = 0;vertices[ vert++ ] = main.chunk_size;vertices[ vert++ ] = x + side;
						vertices[ vert++ ] = main.chunk_size;vertices[ vert++ ] = main.chunk_size;vertices[ vert++ ] = x + side;
						vertices[ vert++ ] = main.chunk_size;vertices[ vert++ ] = 0;vertices[ vert++ ] = x + side;

						uvs[ uv++ ] = micro_border_offset_0 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_1 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_0 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_0 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_1 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_0 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_1 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_1 * uv_scale_y + uv_y;}

					for ( var x = 0; x < chunk_size; x++ ){
						var uv_x = x / chunk_size;var uv_y = uv_scale_y * 2;
						if ( side === 0 ){
							indices[ ind++ ] = vert / 3;indices[ ind++ ] = vert / 3 + 1;indices[ ind++ ] = vert / 3 + 2;
							indices[ ind++ ] = vert / 3 + 2;indices[ ind++ ] = vert / 3 + 3;indices[ ind++ ] = vert / 3;}
						else{
							indices[ ind++ ] = vert / 3;indices[ ind++ ] = vert / 3 + 2;indices[ ind++ ] = vert / 3 + 1;
							indices[ ind++ ] = vert / 3 + 3;indices[ ind++ ] = vert / 3 + 2;indices[ ind++ ] = vert / 3;}

						vertices[ vert++ ] = 0;vertices[ vert++ ] = x + side;vertices[ vert++ ] = 0;
						vertices[ vert++ ] = main.chunk_size;vertices[ vert++ ] = x + side;vertices[ vert++ ] = 0;
						vertices[ vert++ ] = main.chunk_size;vertices[ vert++ ] = x + side;vertices[ vert++ ] = main.chunk_size;
						vertices[ vert++ ] = 0;vertices[ vert++ ] = x + side;vertices[ vert++ ] = main.chunk_size;

						uvs[ uv++ ] = micro_border_offset_0 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_1 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_0 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_0 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_1 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_0 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_1 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_1 * uv_scale_y + uv_y;}
				
					for ( var x = 0; x < chunk_size; x++ ){
						var uv_x = x / chunk_size;
						var uv_y = uv_scale_y;

						if ( side === 0 ){
							indices[ ind++ ] = vert / 3;indices[ ind++ ] = vert / 3 + 1;indices[ ind++ ] = vert / 3 + 2;
							indices[ ind++ ] = vert / 3 + 2;indices[ ind++ ] = vert / 3 + 3;indices[ ind++ ] = vert / 3;}
						else{
							indices[ ind++ ] = vert / 3;indices[ ind++ ] = vert / 3 + 2;indices[ ind++ ] = vert / 3 + 1;
							indices[ ind++ ] = vert / 3 + 3;indices[ ind++ ] = vert / 3 + 2;indices[ ind++ ] = vert / 3;}

				        vertices[ vert++ ] = x + side;vertices[ vert++ ] = 0;vertices[ vert++ ] = 0;
						vertices[ vert++ ] = x + side;vertices[ vert++ ] = 0;vertices[ vert++ ] = main.chunk_size;
						vertices[ vert++ ] = x + side;vertices[ vert++ ] = main.chunk_size;vertices[ vert++ ] = main.chunk_size;
						vertices[ vert++ ] = x + side;vertices[ vert++ ] = main.chunk_size;vertices[ vert++ ] = 0;

						uvs[ uv++ ] = micro_border_offset_0 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_1 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_0 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_0 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_1 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_0 * uv_scale_y + uv_y;
						uvs[ uv++ ] = micro_border_offset_1 * uv_scale_x + uv_x;uvs[ uv++ ] = micro_border_offset_1 * uv_scale_y + uv_y;}}
				
				sub_geom.updateVertexDataTyped( vertices );sub_geom.updateIndexDataTyped( indices );sub_geom.updateUVDataTyped( uvs );
				sub_geom.boundingBox = new THREE.Box3( new THREE.Vector3( 0, 0, 0 ),new THREE.Vector3( chunk_size, chunk_size, chunk_size ) );
				sub_geom.boundingSphere = new THREE.Sphere( new THREE.Vector3( ( 0.5 ) * chunk_size, ( 0.5 ) * chunk_size, ( 0.5 ) * chunk_size ), Math.sqrt( 3 * Math.pow( chunk_size / 2, 2 ) ) );

				var tex = new THREE.CanvasTexture( this.bitmap.ctx.canvas );
				tex.magFilter = THREE.NearestFilter;tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false;
				
				var mat = sdShaderMaterial.CreateMaterial( tex, 'voxel_map' );
				main.materials_with_dyn_light.push( mat );
		
				this.bit_mesh = new THREE.Mesh( sub_geom, mat );
				this.bit_mesh.position.x = this.xx * main.chunk_size;this.bit_mesh.position.y = this.yy * main.chunk_size;this.bit_mesh.position.z = this.zz * main.chunk_size;
				main.scene.add( this.bit_mesh );
				
				mat.uniforms.fog.value = new THREE.Color( main.fog_color );mat.uniforms.fog_intensity.value = 1; }

			var c = new RGBA();
			var i = 0;
			var bitmap = this.bitmap;
			var data = this.bitmap.pixel_data.data;
			
			function SetRGB( x, y, r,g,b,a ){
				var p = ( y * bitmap.width + x ) * 4;
				data[ p++ ] = r;data[ p++ ] = g;data[ p++ ] = b;data[ p ] = a; }
			
			var rgba = this.rgba;
			var uvs2 = this.uvs2;
			var x, y, z, br;

			for ( z = 0; z < chunk_size; z++ )
			for ( y = 0; y < chunk_size; y++ )
			for ( x = 0; x < chunk_size; x++ ){
				i = x * chunk_size * chunk_size + y * chunk_size + z;
				br = uvs2[ i ] * 85;
				i *= 4;
				
				if ( br >= 0 ) SetRGB( x + z * chunk_size, y, rgba[ i++ ] * br, rgba[ i++ ] * br, rgba[ i++ ] * br, rgba[ i ] * 255 );
				else SetRGB( x + z * chunk_size, y + chunk_size * 2, 0,0,0,0 );}

			for ( z = 0; z < chunk_size; z++ )
			for ( y = 0; y < chunk_size; y++ )
			for ( x = 0; x < chunk_size; x++ ){
				i = y * chunk_size * chunk_size + z * chunk_size + x;
				br = uvs2[ i ] * 85;
				i *= 4;
				
				if ( br >= 0 ) SetRGB( x + z * chunk_size, y + chunk_size, rgba[ i++ ] * br, rgba[ i++ ] * br, rgba[ i++ ] * br, rgba[ i ] * 255 );
				else SetRGB( x + z * chunk_size, y + chunk_size * 2, 0,0,0,0 );}

			for ( z = 0; z < chunk_size; z++ )
			for ( y = 0; y < chunk_size; y++ )
			for ( x = 0; x < chunk_size; x++ ){
				i = z * chunk_size * chunk_size + x * chunk_size + y;
				br = uvs2[ i ] * 85;
				i *= 4;
				
				if ( br >= 0 ) SetRGB( x + z * chunk_size, y + chunk_size * 2, rgba[ i++ ] * br, rgba[ i++ ] * br, rgba[ i++ ] * br, rgba[ i ] * 255 );
				else SetRGB( x + z * chunk_size, y + chunk_size * 2, 0,0,0,0 );}

			this.bitmap.setPixelsDone();		
			this.bit_mesh.material.map.needsUpdate = true; }}}
